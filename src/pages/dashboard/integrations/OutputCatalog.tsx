import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cloud, 
  Download, 
  FileText, 
  Image, 
  Database, 
  Shield, 
  CheckCircle, 
  Clock,
  HardDrive,
  Eye,
  Archive,
  Filter
} from 'lucide-react';

interface OutputRecord {
  id: string;
  type: 'detection' | 'anonymization' | 'report';
  source: string;
  fileName: string;
  size: string;
  created: string;
  status: 'processing' | 'completed' | 'failed';
  privacy_level: 'safe' | 'sensitive' | 'restricted';
  records_processed: number;
}

export const OutputCatalog: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const outputRecords: OutputRecord[] = [
    {
      id: '1',
      type: 'anonymization',
      source: 'Healthcare DB',
      fileName: 'patient_records_anonymized_20240115.csv',
      size: '125.3 MB',
      created: '2024-01-15 14:30:00',
      status: 'completed',
      privacy_level: 'safe',
      records_processed: 45678
    },
    {
      id: '2',
      type: 'detection',
      source: 'Medical Images',
      fileName: 'pii_detection_results_imaging.json',
      size: '8.7 MB',
      created: '2024-01-15 14:25:00',
      status: 'completed',
      privacy_level: 'sensitive',
      records_processed: 1234
    },
    {
      id: '3',
      type: 'report',
      source: 'Compliance Audit',
      fileName: 'hipaa_compliance_report_jan2024.pdf',
      size: '2.1 MB',
      created: '2024-01-15 14:20:00',
      status: 'completed',
      privacy_level: 'restricted',
      records_processed: 89456
    },
    {
      id: '4',
      type: 'anonymization',
      source: 'EHR System',
      fileName: 'clinical_notes_redacted.txt',
      size: '89.4 MB',
      created: '2024-01-15 14:15:00',
      status: 'processing',
      privacy_level: 'safe',
      records_processed: 23456
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'detection': return <Eye className="w-4 h-4 text-warning" />;
      case 'anonymization': return <Shield className="w-4 h-4 text-success" />;
      case 'report': return <FileText className="w-4 h-4 text-primary" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/15 text-success border-success/30">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-primary/15 text-primary border-primary/30">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-destructive/15 text-destructive border-destructive/30">Failed</Badge>;
      default:
        return <Badge className="bg-muted/50 text-muted-foreground">Unknown</Badge>;
    }
  };

  const getPrivacyBadge = (level: string) => {
    switch (level) {
      case 'safe':
        return <Badge className="bg-success/15 text-success border-success/30">Safe</Badge>;
      case 'sensitive':
        return <Badge className="bg-warning/15 text-warning border-warning/30">Sensitive</Badge>;
      case 'restricted':
        return <Badge className="bg-destructive/15 text-destructive border-destructive/30">Restricted</Badge>;
      default:
        return <Badge className="bg-muted/50 text-muted-foreground">Unknown</Badge>;
    }
  };

  const filteredRecords = filter === 'all' 
    ? outputRecords 
    : outputRecords.filter(record => record.type === filter);

  const storageStats = {
    totalSize: '1.2 TB',
    filesCount: 15678,
    safeFiles: 12456,
    sensitiveFiles: 2134,
    restrictedFiles: 1088
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Data Output Catalog
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and access your processed healthcare data outputs with privacy classifications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-background border border-border rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Types</option>
              <option value="detection">Detection Results</option>
              <option value="anonymization">Anonymized Data</option>
              <option value="report">Compliance Reports</option>
            </select>
          </div>
          <Button className="bg-gradient-primary text-white shadow-medium hover:shadow-strong">
            <Archive className="w-4 h-4 mr-2" />
            Archive Outputs
          </Button>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="grid md:grid-cols-5 gap-6">
        <Card className="border-primary/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{storageStats.totalSize}</div>
            <p className="text-xs text-muted-foreground">Healthcare data processed</p>
          </CardContent>
        </Card>
        
        <Card className="border-accent/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{storageStats.filesCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Output files</p>
          </CardContent>
        </Card>
        
        <Card className="border-success/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safe Files</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{storageStats.safeFiles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Privacy compliant</p>
          </CardContent>
        </Card>
        
        <Card className="border-warning/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sensitive</CardTitle>
            <Shield className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{storageStats.sensitiveFiles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Requires care</p>
          </CardContent>
        </Card>
        
        <Card className="border-destructive/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Restricted</CardTitle>
            <Eye className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{storageStats.restrictedFiles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Access controlled</p>
          </CardContent>
        </Card>
      </div>

      {/* Output Files */}
      <Card className="shadow-soft border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-primary" />
            Healthcare Data Outputs
          </CardTitle>
          <CardDescription>
            Privacy-processed healthcare data with intelligent classification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-muted/30 transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                    {getTypeIcon(record.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{record.fileName}</h3>
                      {getStatusBadge(record.status)}
                      {getPrivacyBadge(record.privacy_level)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Source: {record.source}</span>
                      <span>Size: {record.size}</span>
                      <span>Records: {record.records_processed.toLocaleString()}</span>
                      <span>Created: {record.created}</span>
                    </div>
                    
                    {record.status === 'processing' && (
                      <div className="mt-2 flex items-center gap-2">
                        <Progress value={65} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground">65%</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Classification Guide */}
      <Card className="shadow-soft border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Privacy Classification Guide
          </CardTitle>
          <CardDescription>
            Understanding our AI-powered privacy classifications for healthcare data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl border border-success/30 bg-success/5">
              <div className="w-12 h-12 mx-auto mb-3 bg-success/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-success mb-2">Safe Files</h3>
              <p className="text-sm text-muted-foreground">
                Fully anonymized data with no identifiable information. Safe for sharing and analysis.
              </p>
            </div>
            
            <div className="text-center p-4 rounded-xl border border-warning/30 bg-warning/5">
              <div className="w-12 h-12 mx-auto mb-3 bg-warning/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold text-warning mb-2">Sensitive Files</h3>
              <p className="text-sm text-muted-foreground">
                Partially processed data that may contain quasi-identifiers. Handle with care.
              </p>
            </div>
            
            <div className="text-center p-4 rounded-xl border border-destructive/30 bg-destructive/5">
              <div className="w-12 h-12 mx-auto mb-3 bg-destructive/20 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-semibold text-destructive mb-2">Restricted Files</h3>
              <p className="text-sm text-muted-foreground">
                Contains original PHI/PII. Access restricted to authorized personnel only.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
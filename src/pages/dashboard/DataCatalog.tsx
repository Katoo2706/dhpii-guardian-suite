import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Shield, 
  Eye, 
  AlertTriangle, 
  CheckCircle,
  Filter,
  Tags,
  Database,
  FileText,
  Image,
  Calendar
} from 'lucide-react';

interface CatalogItem {
  id: string;
  name: string;
  type: 'table' | 'file' | 'image';
  database: string;
  piiCount: number;
  phiCount: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastScanned: string;
  tags: string[];
}

export const DataCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const catalogItems: CatalogItem[] = [
    {
      id: '1',
      name: 'customer_records',
      type: 'table',
      database: 'production_db',
      piiCount: 15,
      phiCount: 0,
      riskLevel: 'high',
      lastScanned: '2024-01-15 10:30:00',
      tags: ['CUSTOMER_DATA', 'FINANCIAL', 'PII']
    },
    {
      id: '2',
      name: 'medical_images',
      type: 'image',
      database: 'healthcare_storage',
      piiCount: 0,
      phiCount: 8,
      riskLevel: 'critical',
      lastScanned: '2024-01-15 09:15:00',
      tags: ['MEDICAL', 'PHI', 'DICOM']
    },
    {
      id: '3',
      name: 'patient_documents',
      type: 'file',
      database: 'document_store',
      piiCount: 12,
      phiCount: 25,
      riskLevel: 'critical',
      lastScanned: '2024-01-15 08:45:00',
      tags: ['HEALTHCARE', 'PHI', 'DOCUMENTS']
    },
    {
      id: '4',
      name: 'user_analytics',
      type: 'table',
      database: 'analytics_db',
      piiCount: 3,
      phiCount: 0,
      riskLevel: 'medium',
      lastScanned: '2024-01-15 11:20:00',
      tags: ['ANALYTICS', 'BEHAVIORAL']
    },
    {
      id: '5',
      name: 'public_reports',
      type: 'file',
      database: 'reporting_db',
      piiCount: 0,
      phiCount: 0,
      riskLevel: 'low',
      lastScanned: '2024-01-15 12:00:00',
      tags: ['PUBLIC', 'REPORTS']
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <Eye className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'table': return <Database className="w-4 h-4" />;
      case 'file': return <FileText className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredItems = catalogItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.database.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRisk = selectedRisk === 'all' || item.riskLevel === selectedRisk;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    return matchesSearch && matchesRisk && matchesType;
  });

  const riskCounts = {
    critical: catalogItems.filter(item => item.riskLevel === 'critical').length,
    high: catalogItems.filter(item => item.riskLevel === 'high').length,
    medium: catalogItems.filter(item => item.riskLevel === 'medium').length,
    low: catalogItems.filter(item => item.riskLevel === 'low').length,
  };

  const totalPII = catalogItems.reduce((sum, item) => sum + item.piiCount, 0);
  const totalPHI = catalogItems.reduce((sum, item) => sum + item.phiCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Catalog</h1>
          <p className="text-muted-foreground mt-2">
            Discover, classify, and monitor sensitive data across your organization
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
          <Shield className="w-4 h-4 mr-2" />
          Run Full Scan
        </Button>
      </div>

      {/* Risk Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{riskCounts.critical}</div>
            <p className="text-xs text-muted-foreground">Assets requiring immediate attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{riskCounts.high}</div>
            <p className="text-xs text-muted-foreground">Assets with elevated risk</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PII Entities</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalPII}</div>
            <p className="text-xs text-muted-foreground">Personal identifiable information</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PHI Entities</CardTitle>
            <Shield className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{totalPHI}</div>
            <p className="text-xs text-muted-foreground">Protected health information</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Data Assets</CardTitle>
          <CardDescription>
            Browse and manage your cataloged data assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets, databases, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedRisk} onValueChange={setSelectedRisk}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="table">Tables</SelectItem>
                <SelectItem value="file">Files</SelectItem>
                <SelectItem value="image">Images</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <Badge className={getRiskColor(item.riskLevel)}>
                        {getRiskIcon(item.riskLevel)}
                        <span className="ml-1">{item.riskLevel.toUpperCase()}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Database: {item.database}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Shield className="w-3 h-3 mr-1 text-primary" />
                        {item.piiCount} PII
                      </span>
                      <span className="flex items-center">
                        <Shield className="w-3 h-3 mr-1 text-accent" />
                        {item.phiCount} PHI
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.lastScanned}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tags className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Scan Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
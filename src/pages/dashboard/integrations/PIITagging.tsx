import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Tags, 
  Plus, 
  Settings, 
  Eye, 
  Brain, 
  Database, 
  Shield, 
  Target,
  CheckCircle,
  AlertTriangle,
  Zap,
  Network,
  Search,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TaggingSystem {
  id: string;
  name: string;
  type: 'catalog' | 'governance' | 'discovery';
  status: 'active' | 'inactive' | 'syncing';
  provider: string;
  description: string;
  lastSync?: string;
  tagsManaged: number;
  accuracy: number;
}

interface PIITag {
  id: string;
  name: string;
  category: 'medical' | 'personal' | 'financial' | 'government';
  confidence: number;
  occurences: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastDetected: string;
}

export const PIITagging: React.FC = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const taggingSystems: TaggingSystem[] = [
    {
      id: '1',
      name: 'Apache Atlas',
      type: 'catalog',
      status: 'active',
      provider: 'Apache Atlas',
      description: 'Enterprise metadata management with automated PII/PHI classification',
      lastSync: '2024-01-15 14:30:00',
      tagsManaged: 15678,
      accuracy: 97.8
    },
    {
      id: '2',
      name: 'DataHub Catalog',
      type: 'catalog',
      status: 'active',
      provider: 'DataHub',
      description: 'Modern data catalog with AI-powered data discovery and lineage',
      lastSync: '2024-01-15 14:25:00',
      tagsManaged: 23456,
      accuracy: 98.5
    },
    {
      id: '3',
      name: 'Unity Catalog',
      type: 'governance',
      status: 'syncing',
      provider: 'Databricks',
      description: 'Unified governance solution for data and AI assets',
      lastSync: '2024-01-15 14:20:00',
      tagsManaged: 8934,
      accuracy: 96.2
    },
    {
      id: '4',
      name: 'OpenMetadata',
      type: 'discovery',
      status: 'inactive',
      provider: 'OpenMetadata',
      description: 'Open-source metadata platform with automated data profiling',
      tagsManaged: 0,
      accuracy: 0
    }
  ];

  const piiTags: PIITag[] = [
    {
      id: '1',
      name: 'Social Security Number',
      category: 'government',
      confidence: 99.2,
      occurences: 12456,
      riskLevel: 'critical',
      lastDetected: '2024-01-15 14:30:00'
    },
    {
      id: '2',
      name: 'Medical Record Number',
      category: 'medical',
      confidence: 97.8,
      occurences: 8934,
      riskLevel: 'high',
      lastDetected: '2024-01-15 14:28:00'
    },
    {
      id: '3',
      name: 'Email Address',
      category: 'personal',
      confidence: 98.5,
      occurences: 23456,
      riskLevel: 'medium',
      lastDetected: '2024-01-15 14:25:00'
    },
    {
      id: '4',
      name: 'Credit Card Number',
      category: 'financial',
      confidence: 99.8,
      occurences: 1234,
      riskLevel: 'critical',
      lastDetected: '2024-01-15 14:20:00'
    },
    {
      id: '5',
      name: 'Phone Number',
      category: 'personal',
      confidence: 94.2,
      occurences: 34567,
      riskLevel: 'low',
      lastDetected: '2024-01-15 14:15:00'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'syncing':
        return <Zap className="w-4 h-4 text-primary animate-pulse" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/15 text-success border-success/30">Active</Badge>;
      case 'syncing':
        return <Badge className="bg-primary/15 text-primary border-primary/30">Syncing</Badge>;
      default:
        return <Badge className="bg-warning/15 text-warning border-warning/30">Inactive</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'critical':
        return <Badge className="bg-destructive/15 text-destructive border-destructive/30">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-500/15 text-orange-500 border-orange-500/30">High</Badge>;
      case 'medium':
        return <Badge className="bg-warning/15 text-warning border-warning/30">Medium</Badge>;
      case 'low':
        return <Badge className="bg-success/15 text-success border-success/30">Low</Badge>;
      default:
        return <Badge className="bg-muted/50 text-muted-foreground">Unknown</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medical': return '🏥';
      case 'personal': return '👤';
      case 'financial': return '💳';
      case 'government': return '🏛️';
      default: return '📋';
    }
  };

  const catalogProviders = [
    { name: 'Apache Atlas', icon: '🗺️', color: 'from-emerald-500 to-emerald-600' },
    { name: 'DataHub', icon: '🏛️', color: 'from-purple-500 to-purple-600' },
    { name: 'Unity Catalog', icon: '🏗️', color: 'from-violet-500 to-violet-600' },
    { name: 'OpenMetadata', icon: '📊', color: 'from-blue-500 to-blue-600' },
    { name: 'Collibra', icon: '🔍', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Alation', icon: '🎯', color: 'from-teal-500 to-teal-600' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PII/PHI Tagging & Governance
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered data classification and automated privacy tagging for healthcare data
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-white shadow-medium hover:shadow-strong">
              <Plus className="w-4 h-4 mr-2" />
              Add Catalog System
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Connect Data Catalog</DialogTitle>
              <DialogDescription>
                Integrate with enterprise data catalogs for automated PII/PHI tagging
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {catalogProviders.map((provider) => (
                <div
                  key={provider.name}
                  className="group cursor-pointer p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 text-center"
                  onClick={() => {
                    toast({
                      title: "Catalog Integration",
                      description: `Setting up ${provider.name} connection...`,
                    });
                    setIsAddDialogOpen(false);
                  }}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 bg-gradient-to-br ${provider.color} rounded-lg flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform`}>
                    {provider.icon}
                  </div>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{provider.name}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-primary/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Systems</CardTitle>
            <Network className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {taggingSystems.filter(s => s.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Catalog integrations</p>
          </CardContent>
        </Card>
        
        <Card className="border-accent/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tags Managed</CardTitle>
            <Tags className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {taggingSystems.reduce((sum, s) => sum + s.tagsManaged, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Privacy classifications</p>
          </CardContent>
        </Card>
        
        <Card className="border-success/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.round(taggingSystems.filter(s => s.accuracy > 0).reduce((sum, s) => sum + s.accuracy, 0) / taggingSystems.filter(s => s.accuracy > 0).length)}%
            </div>
            <p className="text-xs text-muted-foreground">Classification accuracy</p>
          </CardContent>
        </Card>
        
        <Card className="border-warning/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Tags</CardTitle>
            <Shield className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {piiTags.filter(tag => tag.riskLevel === 'critical').length}
            </div>
            <p className="text-xs text-muted-foreground">High-risk PII types</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="systems" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="systems">Catalog Systems</TabsTrigger>
          <TabsTrigger value="tags">PII/PHI Tags</TabsTrigger>
          <TabsTrigger value="governance">Governance Rules</TabsTrigger>
        </TabsList>
        
        <TabsContent value="systems" className="space-y-6">
          <Card className="shadow-soft border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Connected Catalog Systems
              </CardTitle>
              <CardDescription>
                Enterprise data catalogs providing automated PII/PHI classification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taggingSystems.map((system) => (
                  <div
                    key={system.id}
                    className="flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-muted/30 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                        <Database className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{system.name}</h3>
                          {getStatusIcon(system.status)}
                          {getStatusBadge(system.status)}
                          <Badge variant="outline" className="text-xs">{system.type}</Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{system.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Tags: <span className="font-medium text-accent">{system.tagsManaged.toLocaleString()}</span>
                          </span>
                          <span className="text-muted-foreground">
                            Accuracy: <span className="font-medium text-success">{system.accuracy}%</span>
                          </span>
                          {system.lastSync && (
                            <span className="text-muted-foreground">
                              Last sync: <span className="font-medium">{system.lastSync}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <Zap className="w-4 h-4 mr-2" />
                        Sync Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tags" className="space-y-6">
          <Card className="shadow-soft border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tags className="w-5 h-5 text-primary" />
                Discovered PII/PHI Tags
              </CardTitle>
              <CardDescription>
                AI-identified privacy-sensitive data patterns across your healthcare systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {piiTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-muted/30 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-2xl">
                        {getCategoryIcon(tag.category)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{tag.name}</h3>
                          {getRiskBadge(tag.riskLevel)}
                          <Badge variant="outline" className="text-xs capitalize">{tag.category}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Confidence: <span className="font-medium text-success">{tag.confidence}%</span>
                          </span>
                          <span className="text-muted-foreground">
                            Found: <span className="font-medium text-warning">{tag.occurences.toLocaleString()} times</span>
                          </span>
                          <span className="text-muted-foreground">
                            Last seen: <span className="font-medium">{tag.lastDetected}</span>
                          </span>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Detection confidence:</span>
                          <Progress value={tag.confidence} className="flex-1 h-2 max-w-xs" />
                          <span className="text-xs font-medium">{tag.confidence}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Target className="w-4 h-4 mr-2" />
                        Create Rule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="governance" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Automated Rules
                </CardTitle>
                <CardDescription>
                  AI-powered governance rules for healthcare data privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border border-success/30 rounded-lg bg-success/5">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="font-medium text-success">Auto-tag SSN patterns</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Automatically classify Social Security Numbers as critical PII</p>
                </div>
                
                <div className="p-3 border border-primary/30 rounded-lg bg-primary/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">HIPAA compliance check</span>
                  </div>
                  <p className="text-xs text-muted-foreground">AI validation against HIPAA privacy requirements</p>
                </div>
                
                <div className="p-3 border border-warning/30 rounded-lg bg-warning/5">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="font-medium text-warning">Medical record alerts</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Notify on medical record number exposure</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Compliance Reports
                </CardTitle>
                <CardDescription>
                  Generated compliance and audit reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">HIPAA Assessment Report</p>
                    <p className="text-xs text-muted-foreground">January 2024 • 45 pages</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Data Lineage Analysis</p>
                    <p className="text-xs text-muted-foreground">January 2024 • 23 pages</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Privacy Impact Assessment</p>
                    <p className="text-xs text-muted-foreground">December 2023 • 67 pages</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
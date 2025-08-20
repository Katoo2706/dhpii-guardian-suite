import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Shield, 
  Eye, 
  Database, 
  Bot, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Users,
  FileText,
  Image,
  Network,
  Brain
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const systemMetrics = {
    totalScanned: 245678,
    piiDetected: 12456,
    anonymized: 8934,
    activeConnections: 8,
    successRate: 99.2,
    processingTime: 2.3
  };

  const recentActivities = [
    {
      id: '1',
      type: 'detection',
      title: 'PII Detection Complete',
      description: 'Scanned 1,245 healthcare records',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'anonymization',
      title: 'Batch Anonymization',
      description: '892 patient records anonymized',
      timestamp: '5 minutes ago',
      status: 'success'
    },
    {
      id: '3',
      type: 'integration',
      title: 'New Database Connected',
      description: 'PostgreSQL production database',
      timestamp: '12 minutes ago',
      status: 'info'
    },
    {
      id: '4',
      type: 'alert',
      title: 'High Risk PII Detected',
      description: 'SSN patterns found in logs',
      timestamp: '18 minutes ago',
      status: 'warning'
    }
  ];

  const activeProcesses = [
    {
      name: 'Healthcare DB Scan',
      progress: 78,
      eta: '3 min',
      type: 'detection'
    },
    {
      name: 'Document Anonymization',
      progress: 45,
      eta: '7 min',
      type: 'anonymization'
    },
    {
      name: 'Atlas Metadata Sync',
      progress: 92,
      eta: '1 min',
      type: 'integration'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'detection': return <Eye className="w-4 h-4 text-primary" />;
      case 'anonymization': return <Shield className="w-4 h-4 text-success" />;
      case 'integration': return <Database className="w-4 h-4 text-accent" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-warning" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-success/15 text-success border-success/30 hover:bg-success/20">Success</Badge>;
      case 'warning':
        return <Badge className="bg-warning/15 text-warning border-warning/30 hover:bg-warning/20">Warning</Badge>;
      case 'info':
        return <Badge className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">Info</Badge>;
      default:
        return <Badge className="bg-muted/50 text-muted-foreground">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            AI-Powered Data Protection Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Real-time insights into your healthcare data privacy and security
          </p>
        </div>
        <Button className="bg-gradient-primary text-white shadow-medium hover:shadow-strong transition-shadow">
          <Brain className="w-4 h-4 mr-2" />
          AI Insights
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-card shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Scanned</CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {systemMetrics.totalScanned.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Records processed</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary opacity-60" />
        </Card>

        <Card className="relative overflow-hidden border-warning/20 bg-gradient-card shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">PII Detected</CardTitle>
            <Eye className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {systemMetrics.piiDetected.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Sensitive data found</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-warning to-warning/70 opacity-60" />
        </Card>

        <Card className="relative overflow-hidden border-success/20 bg-gradient-card shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Anonymized</CardTitle>
            <Shield className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {systemMetrics.anonymized.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Records protected</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-success to-success/70 opacity-60" />
        </Card>

        <Card className="relative overflow-hidden border-accent/20 bg-gradient-card shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Integrations</CardTitle>
            <Network className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {systemMetrics.activeConnections}
            </div>
            <p className="text-xs text-muted-foreground">Active connections</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/70 opacity-60" />
        </Card>

        <Card className="relative overflow-hidden border-primary/20 bg-gradient-card shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Success Rate</CardTitle>
            <CheckCircle className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {systemMetrics.successRate}%
            </div>
            <p className="text-xs text-muted-foreground">AI accuracy</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-success to-primary opacity-60" />
        </Card>

        <Card className="relative overflow-hidden border-accent/20 bg-gradient-card shadow-soft hover:shadow-medium transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Avg Processing</CardTitle>
            <Zap className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {systemMetrics.processingTime}s
            </div>
            <p className="text-xs text-muted-foreground">Per record</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary opacity-60" />
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Processes */}
        <Card className="lg:col-span-1 shadow-soft border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Active AI Processes
            </CardTitle>
            <CardDescription>Real-time processing status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeProcesses.map((process, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {process.type === 'detection' && <Eye className="w-4 h-4 text-primary" />}
                    {process.type === 'anonymization' && <Shield className="w-4 h-4 text-success" />}
                    {process.type === 'integration' && <Database className="w-4 h-4 text-accent" />}
                    <span className="text-sm font-medium">{process.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{process.eta}</span>
                </div>
                <Progress value={process.progress} className="h-2" />
                <div className="text-xs text-right text-muted-foreground">{process.progress}%</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-soft border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent AI Activity
            </CardTitle>
            <CardDescription>Latest automated privacy operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">{activity.title}</p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-soft border-success/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-success/20 to-success/30 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-success">Data Protection</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-success mb-2">Healthy</div>
            <p className="text-sm text-muted-foreground">All privacy controls active</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-primary/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-primary">AI Models</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">Online</div>
            <p className="text-sm text-muted-foreground">GPT-4 & Vision models active</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-accent/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent/20 to-accent/30 rounded-full flex items-center justify-center">
              <Database className="w-8 h-8 text-accent" />
            </div>
            <CardTitle className="text-accent">Integrations</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-accent mb-2">8/8</div>
            <p className="text-sm text-muted-foreground">All connections stable</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-warning/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-warning/20 to-warning/30 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
            <CardTitle className="text-warning">Performance</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold text-warning mb-2">Optimal</div>
            <p className="text-sm text-muted-foreground">99.2% success rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Cpu, 
  Network, 
  Zap, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Activity,
  Code,
  Database,
  Brain,
  Eye
} from 'lucide-react';

interface MCPConnector {
  id: string;
  name: string;
  type: 'ai' | 'database' | 'api' | 'governance';
  status: 'active' | 'inactive' | 'error';
  description: string;
  lastActivity: string;
  requestCount: number;
  successRate: number;
}

interface MCPTask {
  id: string;
  name: string;
  type: 'detection' | 'anonymization' | 'governance' | 'analysis';
  status: 'running' | 'completed' | 'failed' | 'queued';
  progress: number;
  startTime: string;
  estimatedTime?: string;
}

export const MCPServer: React.FC = () => {
  const [autoMode, setAutoMode] = useState(true);
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);

  const connectors: MCPConnector[] = [
    {
      id: '1',
      name: 'OpenAI GPT-4 Connector',
      type: 'ai',
      status: 'active',
      description: 'AI-powered text analysis and classification for enhanced PII/PHI detection',
      lastActivity: '2024-01-15 14:30:00',
      requestCount: 1247,
      successRate: 99.2
    },
    {
      id: '2',
      name: 'Apache Atlas Sync',
      type: 'governance',
      status: 'active',
      description: 'Automated metadata synchronization and governance policy enforcement',
      lastActivity: '2024-01-15 14:25:00',
      requestCount: 856,
      successRate: 98.7
    },
    {
      id: '3',
      name: 'Salesforce Connector',
      type: 'database',
      status: 'inactive',
      description: 'Real-time data protection for Salesforce customer records',
      lastActivity: '2024-01-15 12:15:00',
      requestCount: 432,
      successRate: 97.5
    },
    {
      id: '4',
      name: 'Computer Vision API',
      type: 'api',
      status: 'active',
      description: 'Advanced image analysis for document and medical image PII/PHI detection',
      lastActivity: '2024-01-15 14:28:00',
      requestCount: 634,
      successRate: 99.8
    }
  ];

  const activeTasks: MCPTask[] = [
    {
      id: '1',
      name: 'Healthcare Database Scan',
      type: 'detection',
      status: 'running',
      progress: 67,
      startTime: '2024-01-15 14:00:00',
      estimatedTime: '5 minutes remaining'
    },
    {
      id: '2',
      name: 'Document Anonymization',
      type: 'anonymization',
      status: 'running',
      progress: 34,
      startTime: '2024-01-15 14:10:00',
      estimatedTime: '8 minutes remaining'
    },
    {
      id: '3',
      name: 'Policy Compliance Check',
      type: 'governance',
      status: 'queued',
      progress: 0,
      startTime: '2024-01-15 14:15:00'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'running':
        return <Activity className="w-4 h-4 text-primary animate-pulse" />;
      default:
        return <AlertCircle className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case 'error':
      case 'failed':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Error</Badge>;
      case 'completed':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Completed</Badge>;
      case 'queued':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Queued</Badge>;
      default:
        return <Badge className="bg-warning/10 text-warning border-warning/20">Inactive</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai': return <Brain className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'api': return <Network className="w-4 h-4" />;
      case 'governance': return <Settings className="w-4 h-4" />;
      case 'detection': return <Eye className="w-4 h-4" />;
      case 'anonymization': return <Settings className="w-4 h-4" />;
      case 'analysis': return <Activity className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">MCP Server</h1>
          <p className="text-muted-foreground mt-2">
            AI-driven Model Context Protocol server for intelligent automation and governance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="auto-mode">Auto Mode</Label>
            <Switch
              id="auto-mode"
              checked={autoMode}
              onCheckedChange={setAutoMode}
            />
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            <Bot className="w-4 h-4 mr-2" />
            Configure AI
          </Button>
        </div>
      </div>

      {/* Server Status Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connectors</CardTitle>
            <Network className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {connectors.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">AI-powered integrations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running Tasks</CardTitle>
            <Activity className="h-4 w-4 text-success animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {activeTasks.filter(t => t.status === 'running').length}
            </div>
            <p className="text-xs text-muted-foreground">Active AI processes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.round(connectors.reduce((sum, c) => sum + c.successRate, 0) / connectors.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Zap className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {connectors.reduce((sum, c) => sum + c.requestCount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Processed today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="connectors" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connectors">AI Connectors</TabsTrigger>
          <TabsTrigger value="tasks">Active Tasks</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connectors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Connectors</CardTitle>
              <CardDescription>
                Manage intelligent connectors for automated data governance and analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectors.map((connector) => (
                  <div
                    key={connector.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        {getTypeIcon(connector.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-foreground">{connector.name}</h3>
                          {getStatusIcon(connector.status)}
                          {getStatusBadge(connector.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{connector.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Last activity: {connector.lastActivity}</span>
                          <span>{connector.requestCount} requests</span>
                          <span>{connector.successRate}% success rate</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {connector.status === 'active' ? (
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active AI Tasks</CardTitle>
              <CardDescription>
                Monitor ongoing AI-powered data processing and analysis tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        {getTypeIcon(task.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-foreground">{task.name}</h3>
                          {getStatusBadge(task.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                          <span>Started: {task.startTime}</span>
                          {task.estimatedTime && <span>{task.estimatedTime}</span>}
                        </div>
                        {task.status === 'running' && (
                          <div className="flex items-center space-x-2">
                            <Progress value={task.progress} className="flex-1" />
                            <span className="text-sm text-muted-foreground">{task.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                      {task.status === 'running' && (
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="configuration" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Configuration</CardTitle>
                <CardDescription>Configure AI models and processing parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ai-model">Primary AI Model</Label>
                  <Input id="ai-model" value="GPT-4 Turbo" readOnly />
                </div>
                <div>
                  <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                  <Input id="confidence-threshold" type="number" value="0.85" min="0" max="1" step="0.01" />
                </div>
                <div>
                  <Label htmlFor="batch-size">Batch Processing Size</Label>
                  <Input id="batch-size" type="number" value="100" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="parallel-processing" />
                  <Label htmlFor="parallel-processing">Enable Parallel Processing</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Automation Rules</CardTitle>
                <CardDescription>Configure automated governance and response rules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="auto-anonymize">Auto-Anonymize Threshold</Label>
                  <Input id="auto-anonymize" value="High Risk" readOnly />
                </div>
                <div>
                  <Label htmlFor="alert-threshold">Alert Threshold</Label>
                  <Input id="alert-threshold" type="number" value="10" />
                </div>
                <div>
                  <Label htmlFor="retention-policy">Data Retention (days)</Label>
                  <Input id="retention-policy" type="number" value="90" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="real-time-monitoring" defaultChecked />
                  <Label htmlFor="real-time-monitoring">Real-time Monitoring</Label>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                AI Chat Console
              </CardTitle>
              <CardDescription>Interact with MCP AI assistants for data governance tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-[500px] border border-border/50 rounded-xl overflow-hidden bg-gradient-to-b from-muted/30 to-muted/10">
                <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                    <span className="text-sm font-medium">AI Assistant Online</span>
                  </div>
                  <Badge className="bg-success/15 text-success border-success/30">Connected</Badge>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                  {/* AI Welcome Message */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-background to-muted/30 p-4 rounded-xl border border-primary/20 shadow-soft max-w-md">
                        <p className="text-sm leading-relaxed">
                          🤖 Hello! I'm your DHPII AI assistant powered by advanced language models. I can help you with:
                        </p>
                        <ul className="text-xs mt-3 space-y-1 text-muted-foreground">
                          <li>• PII/PHI detection and classification</li>
                          <li>• Data governance policy recommendations</li>  
                          <li>• System automation and configuration</li>
                          <li>• Compliance and audit support</li>
                        </ul>
                        <p className="text-xs mt-3 font-medium text-primary">What would you like to know?</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Just now</p>
                    </div>
                  </div>

                  {/* Sample User Message */}
                  <div className="flex items-start gap-4 justify-end">
                    <div className="flex-1 flex justify-end">
                      <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-xl shadow-soft max-w-md text-right">
                        <p className="text-sm text-white">
                          Can you help me analyze the latest PII detection results?
                        </p>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">U</span>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-background to-muted/30 p-4 rounded-xl border border-primary/20 shadow-soft max-w-md">
                        <p className="text-sm leading-relaxed">
                          📊 Based on your latest scan, I've identified several key insights:
                        </p>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 bg-warning rounded-full" />
                            <span>12,456 PII entities detected (↑15% from last week)</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 bg-success rounded-full" />
                            <span>8,934 records successfully anonymized</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span>99.2% accuracy rate with GPT-4 model</span>
                          </div>
                        </div>
                        <p className="text-xs mt-3 text-muted-foreground">
                          Would you like me to generate a detailed compliance report?
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">2 minutes ago</p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
                  <div className="flex items-center gap-3">
                    <Input 
                      placeholder="Ask me about data privacy, compliance, or system configuration..."
                      className="flex-1 border-primary/20 focus:border-primary/50 bg-background/80"
                    />
                    <Button className="bg-gradient-primary text-white shadow-soft hover:shadow-medium px-6">
                      <Brain className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    🔒 All conversations are encrypted and comply with healthcare privacy standards
                  </p>
                </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
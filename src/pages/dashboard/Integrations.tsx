import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Database, 
  Plus, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Trash2,
  Edit,
  Activity,
  Shield,
  Network
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  type: 'database' | 'catalog' | 'warehouse';
  status: 'connected' | 'disconnected' | 'error';
  description: string;
  lastSync?: string;
}

export const Integrations: React.FC = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Production PostgreSQL',
      type: 'database',
      status: 'connected',
      description: 'Main production database containing customer records',
      lastSync: '2024-01-15 14:30:00'
    },
    {
      id: '2',
      name: 'Apache Atlas',
      type: 'catalog',
      status: 'connected',
      description: 'Enterprise metadata management and data governance',
      lastSync: '2024-01-15 14:25:00'
    },
    {
      id: '3',
      name: 'Snowflake Data Warehouse',
      type: 'warehouse',
      status: 'disconnected',
      description: 'Analytics and reporting data warehouse',
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    type: 'database' as const,
    host: '',
    port: '',
    database: '',
    username: '',
    token: ''
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <AlertCircle className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-success/10 text-success border-success/20">Connected</Badge>;
      case 'error':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Error</Badge>;
      default:
        return <Badge className="bg-warning/10 text-warning border-warning/20">Disconnected</Badge>;
    }
  };

  const handleAddIntegration = () => {
    const integration: Integration = {
      id: Date.now().toString(),
      name: newIntegration.name,
      type: newIntegration.type,
      status: 'connected',
      description: `${newIntegration.type} integration`,
      lastSync: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    setIntegrations([...integrations, integration]);
    setNewIntegration({
      name: '',
      type: 'database',
      host: '',
      port: '',
      database: '',
      username: '',
      token: ''
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Integration Added",
      description: `${integration.name} has been successfully connected.`,
    });
  };

  const handleTestConnection = (id: string) => {
    toast({
      title: "Testing Connection",
      description: "Connection test initiated...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground mt-2">
            Manage database connections, data catalogs, and external system integrations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Integration
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Integration</DialogTitle>
              <DialogDescription>
                Connect to databases, data catalogs, or data warehouses
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="database" className="w-full" onValueChange={(value) => 
              setNewIntegration({...newIntegration, type: value as any})
            }>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="catalog">Data Catalog</TabsTrigger>
                <TabsTrigger value="warehouse">Data Warehouse</TabsTrigger>
              </TabsList>
              
              <TabsContent value="database" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="db-name">Connection Name</Label>
                    <Input
                      id="db-name"
                      placeholder="Production DB"
                      value={newIntegration.name}
                      onChange={(e) => setNewIntegration({...newIntegration, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="db-type">Database Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select database" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="oracle">Oracle</SelectItem>
                        <SelectItem value="sqlserver">SQL Server</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="db-host">Host</Label>
                    <Input
                      id="db-host"
                      placeholder="localhost"
                      value={newIntegration.host}
                      onChange={(e) => setNewIntegration({...newIntegration, host: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="db-port">Port</Label>
                    <Input
                      id="db-port"
                      placeholder="5432"
                      value={newIntegration.port}
                      onChange={(e) => setNewIntegration({...newIntegration, port: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="db-database">Database</Label>
                    <Input
                      id="db-database"
                      placeholder="production"
                      value={newIntegration.database}
                      onChange={(e) => setNewIntegration({...newIntegration, database: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="db-username">Username</Label>
                    <Input
                      id="db-username"
                      placeholder="admin"
                      value={newIntegration.username}
                      onChange={(e) => setNewIntegration({...newIntegration, username: e.target.value})}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="catalog" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="catalog-name">Catalog Name</Label>
                    <Input
                      id="catalog-name"
                      placeholder="Apache Atlas"
                      value={newIntegration.name}
                      onChange={(e) => setNewIntegration({...newIntegration, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="catalog-type">Catalog Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select catalog" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="atlas">Apache Atlas</SelectItem>
                        <SelectItem value="datahub">DataHub</SelectItem>
                        <SelectItem value="unity">Unity Catalog</SelectItem>
                        <SelectItem value="openmetadata">OpenMetadata</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="catalog-endpoint">API Endpoint</Label>
                    <Input
                      id="catalog-endpoint"
                      placeholder="https://atlas.company.com/api/atlas/v2"
                      value={newIntegration.host}
                      onChange={(e) => setNewIntegration({...newIntegration, host: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="catalog-token">Access Token</Label>
                    <Input
                      id="catalog-token"
                      type="password"
                      placeholder="Enter access token"
                      value={newIntegration.token}
                      onChange={(e) => setNewIntegration({...newIntegration, token: e.target.value})}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="warehouse" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="warehouse-name">Warehouse Name</Label>
                    <Input
                      id="warehouse-name"
                      placeholder="Snowflake Production"
                      value={newIntegration.name}
                      onChange={(e) => setNewIntegration({...newIntegration, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="warehouse-type">Warehouse Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="snowflake">Snowflake</SelectItem>
                        <SelectItem value="bigquery">BigQuery</SelectItem>
                        <SelectItem value="redshift">Redshift</SelectItem>
                        <SelectItem value="databricks">Databricks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="warehouse-account">Account Identifier</Label>
                    <Input
                      id="warehouse-account"
                      placeholder="xy12345.us-east-1"
                      value={newIntegration.host}
                      onChange={(e) => setNewIntegration({...newIntegration, host: e.target.value})}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddIntegration}>
                Add Integration
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Integration Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.length}</div>
            <p className="text-xs text-muted-foreground">Active connections</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {integrations.filter(i => i.status === 'connected').length}
            </div>
            <p className="text-xs text-muted-foreground">Healthy connections</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {integrations.filter(i => i.status !== 'connected').length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Integrations List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Integrations</CardTitle>
          <CardDescription>
            Manage your database connections, data catalogs, and warehouse integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    {integration.type === 'database' && <Database className="w-5 h-5 text-primary" />}
                    {integration.type === 'catalog' && <Shield className="w-5 h-5 text-primary" />}
                    {integration.type === 'warehouse' && <Network className="w-5 h-5 text-primary" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">{integration.name}</h3>
                      {getStatusIcon(integration.status)}
                      {getStatusBadge(integration.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                    {integration.lastSync && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Last sync: {integration.lastSync}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestConnection(integration.id)}
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Test
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
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
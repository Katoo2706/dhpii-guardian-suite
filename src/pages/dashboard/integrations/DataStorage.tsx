import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Database, 
  Plus, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  HardDrive,
  Cloud,
  Server,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'warehouse' | 'lake' | 'api';
  provider: string;
  status: 'connected' | 'disconnected' | 'error';
  records: number;
  lastSync?: string;
  description: string;
}

export const DataStorage: React.FC = () => {
  const { toast } = useToast();
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Production PostgreSQL',
      type: 'database',
      provider: 'PostgreSQL',
      status: 'connected',
      records: 2456789,
      lastSync: '2024-01-15 14:30:00',
      description: 'Primary production database with patient records'
    },
    {
      id: '2',
      name: 'Healthcare Data Warehouse',
      type: 'warehouse',
      provider: 'Snowflake',
      status: 'connected',
      records: 15678924,
      lastSync: '2024-01-15 14:25:00',
      description: 'Enterprise data warehouse for analytics'
    },
    {
      id: '3',
      name: 'Medical Images Storage',
      type: 'lake',
      provider: 'AWS S3',
      status: 'disconnected',
      records: 892456,
      description: 'Medical imaging data lake for DICOM files'
    },
    {
      id: '4',
      name: 'EHR System API',
      type: 'api',
      provider: 'Epic FHIR',
      status: 'connected',
      records: 456789,
      lastSync: '2024-01-15 14:20:00',
      description: 'Electronic Health Records API integration'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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
        return <Badge className="bg-success/15 text-success border-success/30">Connected</Badge>;
      case 'error':
        return <Badge className="bg-destructive/15 text-destructive border-destructive/30">Error</Badge>;
      default:
        return <Badge className="bg-warning/15 text-warning border-warning/30">Disconnected</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'database': return <Database className="w-5 h-5 text-primary" />;
      case 'warehouse': return <HardDrive className="w-5 h-5 text-accent" />;
      case 'lake': return <Cloud className="w-5 h-5 text-blue-500" />;
      case 'api': return <Server className="w-5 h-5 text-purple-500" />;
      default: return <Database className="w-5 h-5" />;
    }
  };

  const storageProviders = {
    database: [
      { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-500 to-blue-600', description: 'Open-source relational database' },
      { name: 'MySQL', icon: '🐬', color: 'from-orange-500 to-orange-600', description: 'Popular open-source database' },
      { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-600', description: 'NoSQL document database' },
      { name: 'Oracle', icon: '🔴', color: 'from-red-500 to-red-700', description: 'Enterprise relational database' },
      { name: 'SQL Server', icon: '🔵', color: 'from-blue-600 to-blue-700', description: 'Microsoft database system' },
      { name: 'Cassandra', icon: '⚡', color: 'from-yellow-500 to-yellow-600', description: 'Distributed NoSQL database' },
      { name: 'Redis', icon: '🔴', color: 'from-red-400 to-red-500', description: 'In-memory data structure store' },
      { name: 'MariaDB', icon: '🐬', color: 'from-blue-400 to-blue-500', description: 'MySQL-compatible database' }
    ],
    warehouse: [
      { name: 'Snowflake', icon: '❄️', color: 'from-cyan-500 to-cyan-600', description: 'Cloud data warehouse platform' },
      { name: 'BigQuery', icon: '📊', color: 'from-blue-600 to-indigo-600', description: 'Google serverless data warehouse' },
      { name: 'Redshift', icon: '🚀', color: 'from-red-500 to-red-600', description: 'Amazon cloud data warehouse' },
      { name: 'Databricks', icon: '🧱', color: 'from-red-600 to-orange-600', description: 'Unified analytics platform' },
      { name: 'Synapse', icon: '🔷', color: 'from-blue-500 to-blue-600', description: 'Azure analytics service' },
      { name: 'Teradata', icon: '🔶', color: 'from-orange-600 to-red-600', description: 'Enterprise data warehouse' },
      { name: 'Vertica', icon: '🔵', color: 'from-blue-700 to-indigo-700', description: 'Columnar analytics database' },
      { name: 'ClickHouse', icon: '⚡', color: 'from-yellow-600 to-orange-600', description: 'Real-time analytics DBMS' }
    ],
    lakehouse: [
      { name: 'Trino', icon: '🔺', color: 'from-purple-600 to-pink-600', description: 'Distributed SQL query engine' },
      { name: 'Delta Lake', icon: '🔺', color: 'from-blue-600 to-purple-600', description: 'Open-source storage framework' },
      { name: 'Apache Iceberg', icon: '🧊', color: 'from-cyan-600 to-blue-600', description: 'High-performance table format' },
      { name: 'Apache Hudi', icon: '🔥', color: 'from-orange-600 to-red-600', description: 'Incremental data processing' },
      { name: 'Dremio', icon: '💎', color: 'from-indigo-600 to-purple-600', description: 'Data lake engine' },
      { name: 'Starburst', icon: '⭐', color: 'from-yellow-500 to-orange-500', description: 'Trino-based analytics platform' }
    ],
    lake: [
      { name: 'AWS S3', icon: '☁️', color: 'from-orange-500 to-orange-600', description: 'Amazon object storage' },
      { name: 'Azure Data Lake', icon: '🌊', color: 'from-blue-500 to-blue-600', description: 'Microsoft data lake storage' },
      { name: 'Google Cloud Storage', icon: '☁️', color: 'from-green-500 to-green-600', description: 'Google object storage' },
      { name: 'Hadoop HDFS', icon: '🐘', color: 'from-yellow-600 to-orange-600', description: 'Distributed file system' },
      { name: 'MinIO', icon: '🗄️', color: 'from-red-500 to-red-600', description: 'High-performance object storage' },
      { name: 'Ceph', icon: '🔮', color: 'from-purple-500 to-purple-600', description: 'Unified distributed storage' }
    ],
    etl: [
      { name: 'Fivetran', icon: '5️⃣', color: 'from-blue-500 to-cyan-500', description: 'Automated data integration' },
      { name: 'Stitch', icon: '🧵', color: 'from-purple-500 to-pink-500', description: 'Simple data pipeline platform' },
      { name: 'Airbyte', icon: '🌊', color: 'from-blue-400 to-blue-600', description: 'Open-source data integration' },
      { name: 'Apache Airflow', icon: '🌪️', color: 'from-teal-500 to-cyan-600', description: 'Workflow orchestration platform' },
      { name: 'Talend', icon: '🔄', color: 'from-green-600 to-teal-600', description: 'Data integration and quality' },
      { name: 'Informatica', icon: '📊', color: 'from-orange-500 to-red-500', description: 'Enterprise data management' }
    ],
    api: [
      { name: 'Epic FHIR', icon: '🏥', color: 'from-blue-600 to-blue-700', description: 'Healthcare interoperability standard' },
      { name: 'Cerner API', icon: '🏥', color: 'from-green-500 to-green-600', description: 'Healthcare data platform' },
      { name: 'Salesforce', icon: '☁️', color: 'from-blue-400 to-blue-500', description: 'CRM platform APIs' },
      { name: 'REST API', icon: '🔗', color: 'from-purple-500 to-purple-600', description: 'RESTful web services' },
      { name: 'GraphQL', icon: '📡', color: 'from-pink-500 to-pink-600', description: 'Query language for APIs' },
      { name: 'SOAP API', icon: '🧼', color: 'from-cyan-500 to-blue-500', description: 'XML-based messaging protocol' },
      { name: 'gRPC', icon: '⚡', color: 'from-yellow-500 to-orange-500', description: 'High-performance RPC framework' },
      { name: 'Custom API', icon: '⚙️', color: 'from-gray-500 to-gray-600', description: 'Custom integration endpoints' }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Data Storage Integration
          </h1>
          <p className="text-muted-foreground mt-2">
            Connect and manage your healthcare data sources for privacy analysis
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-white shadow-medium hover:shadow-strong">
              <Plus className="w-4 h-4 mr-2" />
              Add Connection
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Data Source</DialogTitle>
              <DialogDescription>
                Connect to databases, data warehouses, data lakes, or APIs
              </DialogDescription>
            </DialogHeader>
            
            <div className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                {Object.entries(storageProviders).map(([category, providers]) => (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <h3 className="font-semibold text-base capitalize text-foreground">
                        {category === 'lakehouse' ? 'Lakehouse Platforms' : 
                         category === 'etl' ? 'ETL & Integration' : 
                         category}
                      </h3>
                    </div>
                    <div className="grid gap-3">
                      {providers.map((provider) => (
                        <div
                          key={provider.name}
                          className="group cursor-pointer p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 hover:shadow-md"
                          onClick={() => {
                            toast({
                              title: "Integration Selected",
                              description: `Setting up ${provider.name} connection...`,
                            });
                            setIsAddDialogOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${provider.color} rounded-lg flex items-center justify-center text-lg transform group-hover:scale-110 transition-transform`}>
                              {provider.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground group-hover:text-primary transition-colors">{provider.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{provider.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-primary/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sources</CardTitle>
            <Database className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dataSources.length}</div>
            <p className="text-xs text-muted-foreground">Connected systems</p>
          </CardContent>
        </Card>
        
        <Card className="border-success/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {dataSources.filter(s => s.status === 'connected').length}
            </div>
            <p className="text-xs text-muted-foreground">Healthy connections</p>
          </CardContent>
        </Card>
        
        <Card className="border-accent/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <Activity className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {dataSources.reduce((sum, s) => sum + s.records, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Healthcare records</p>
          </CardContent>
        </Card>
        
        <Card className="border-warning/20 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {dataSources.filter(s => s.status !== 'connected').length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Sources Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {dataSources.map((source) => (
          <Card key={source.id} className="shadow-soft border-primary/10 hover:shadow-medium transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                    {getTypeIcon(source.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{source.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{source.provider}</Badge>
                      {getStatusBadge(source.status)}
                    </div>
                  </div>
                </div>
                {getStatusIcon(source.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{source.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Records:</span>
                  <p className="font-semibold text-primary">{source.records.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Sync:</span>
                  <p className="font-semibold">{source.lastSync || 'Never'}</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Activity className="w-4 h-4 mr-2" />
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
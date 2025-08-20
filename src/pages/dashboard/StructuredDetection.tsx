import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Database, FileText, Image, Brain, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StructuredDetection: React.FC = () => {
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [aiModel, setAiModel] = useState('presidio');
  const { toast } = useToast();

  const databases = [
    { id: 'prod_db', name: 'Production Database', type: 'PostgreSQL' },
    { id: 'analytics_db', name: 'Analytics Warehouse', type: 'Snowflake' },
    { id: 'customer_db', name: 'Customer CRM', type: 'MySQL' }
  ];

  const tables = [
    { name: 'customers', columns: ['id', 'first_name', 'last_name', 'email', 'phone', 'ssn', 'address'] },
    { name: 'orders', columns: ['id', 'customer_id', 'total', 'created_at', 'billing_address'] },
    { name: 'medical_records', columns: ['patient_id', 'diagnosis', 'treatment', 'doctor_notes', 'insurance_id'] }
  ];

  const handleScan = async () => {
    if (!selectedDatabase || !selectedTable) {
      toast({
        title: "Selection Required",
        description: "Please select a database and table to scan.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          column: 'first_name',
          entity_type: 'PERSON',
          confidence: 0.95,
          sample_values: ['John', 'Jane', 'Robert'],
          risk_level: 'HIGH',
          count: 1247
        },
        {
          column: 'email',
          entity_type: 'EMAIL_ADDRESS',
          confidence: 0.98,
          sample_values: ['john.doe@email.com', 'jane.smith@company.com'],
          risk_level: 'HIGH',
          count: 1244
        },
        {
          column: 'ssn',
          entity_type: 'US_SSN',
          confidence: 0.99,
          sample_values: ['***-**-****', '***-**-****'],
          risk_level: 'CRITICAL',
          count: 1201
        }
      ];
      
      setResults(mockResults);
      setIsLoading(false);
      
      toast({
        title: "Scan Complete",
        description: `Found ${mockResults.length} PII/PHI columns in ${selectedTable}`,
      });
    }, 3000);
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical</Badge>;
      case 'HIGH':
        return <Badge className="bg-warning/10 text-warning border-warning/20">High</Badge>;
      case 'MEDIUM':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Medium</Badge>;
      default:
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <Database className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Structured Data Detection</h1>
          <p className="text-muted-foreground">AI-powered PII/PHI detection for structured databases and data warehouses</p>
        </div>
      </div>

      <Tabs defaultValue="database" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="database">Database Scan</TabsTrigger>
          <TabsTrigger value="files">File Analysis</TabsTrigger>
          <TabsTrigger value="realtime">Real-time Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="database" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Configuration Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>AI-Powered Database Analysis</span>
                </CardTitle>
                <CardDescription>
                  Configure AI models and parameters for structured data PII/PHI detection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-model">AI Detection Model</Label>
                    <Select value={aiModel} onValueChange={setAiModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="presidio">Microsoft Presidio + NLP</SelectItem>
                        <SelectItem value="gpt4">GPT-4 Turbo</SelectItem>
                        <SelectItem value="claude">Claude-3 Sonnet</SelectItem>
                        <SelectItem value="custom">Custom ML Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="database">Database</Label>
                    <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select database" />
                      </SelectTrigger>
                      <SelectContent>
                        {databases.map((db) => (
                          <SelectItem key={db.id} value={db.id}>
                            {db.name} ({db.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="table">Table</Label>
                  <Select value={selectedTable} onValueChange={setSelectedTable}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select table" />
                    </SelectTrigger>
                    <SelectContent>
                      {tables.map((table) => (
                        <SelectItem key={table.name} value={table.name}>
                          {table.name} ({table.columns.length} columns)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTable && (
                  <div className="space-y-2">
                    <Label>Columns to Analyze</Label>
                    <div className="flex flex-wrap gap-2">
                      {tables.find(t => t.name === selectedTable)?.columns.map((column) => (
                        <Badge
                          key={column}
                          variant={selectedColumns.includes(column) ? "default" : "outline"}
                          className="cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedColumns(prev => 
                              prev.includes(column) 
                                ? prev.filter(c => c !== column)
                                : [...prev, column]
                            );
                          }}
                        >
                          {column}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleScan} 
                  disabled={isLoading || !selectedDatabase || !selectedTable}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      AI Analysis in Progress...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Start AI Detection Scan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Detection Results</CardTitle>
                <CardDescription>
                  {results.length > 0 ? `AI detected ${results.length} PII/PHI columns` : 'Results will appear here after analysis'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results.length > 0 ? (
                  <div className="space-y-4">
                    {/* Statistics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{results.length}</div>
                        <div className="text-sm text-muted-foreground">PII Columns</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-destructive">
                          {results.filter(r => r.risk_level === 'CRITICAL').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Critical Risk</div>
                      </div>
                    </div>

                    {/* Results Table */}
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Column</TableHead>
                            <TableHead>Entity Type</TableHead>
                            <TableHead>Risk Level</TableHead>
                            <TableHead>Confidence</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {results.map((result, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                <code className="bg-muted px-2 py-1 rounded text-sm">
                                  {result.column}
                                </code>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {result.entity_type.replace('_', ' ')}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {getRiskBadge(result.risk_level)}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-success" />
                                  <span>{Math.round(result.confidence * 100)}%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No analysis results yet. Configure your database and start an AI-powered scan.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Structured File Analysis</span>
              </CardTitle>
              <CardDescription>
                Analyze CSV, Excel, Parquet, and other structured file formats for PII/PHI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">File Analysis Coming Soon</h3>
                <p>Upload and analyze structured files with AI-powered PII/PHI detection</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Real-time Data Monitoring</span>
              </CardTitle>
              <CardDescription>
                Continuous AI-powered monitoring of data streams and database changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Real-time Monitoring Coming Soon</h3>
                <p>Monitor live data streams and database changes for PII/PHI exposure</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
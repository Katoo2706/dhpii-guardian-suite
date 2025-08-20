import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Search, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { apiMethods, DetectedEntity, COMMON_ENTITIES } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const TextDetection: React.FC = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en');
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.4);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DetectedEntity[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [languages, setLanguages] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Sample text for demo
  const sampleText = `Hello, my name is John Doe and I work at Microsoft Corporation. 
My email address is john.doe@microsoft.com and my phone number is (555) 123-4567. 
I was born on January 15, 1985 and my Social Security Number is 123-45-6789. 
My credit card number is 4532-1234-5678-9012 and it expires on 12/25.
I live at 123 Main Street, Seattle, WA 98101.`;

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      const langs = await apiMethods.getSupportedLanguages();
      setLanguages(langs);
    } catch (err) {
      console.error('Failed to load languages:', err);
    }
  };

  const handleDetection = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults([]);
    
    try {
      const response = await apiMethods.detectText({
        text,
        language,
        entities: selectedEntities.length > 0 ? selectedEntities : undefined,
        confidence_threshold: confidenceThreshold
      });
      
      setResults(response.results);
      setStatistics(response.statistics);
      setSessionId(response.session_id);
      
      toast({
        title: "Detection Complete",
        description: `Found ${response.results.length} potential PII/PHI entities`,
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Detection failed';
      setError(errorMessage);
      toast({
        title: "Detection Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-success/10 text-success border-success/20';
    if (confidence >= 0.6) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-destructive/10 text-destructive border-destructive/20';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.8) return <CheckCircle className="w-4 h-4" />;
    if (confidence >= 0.6) return <AlertTriangle className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <Search className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Text Detection</h1>
          <p className="text-muted-foreground">Detect PII/PHI in text using Microsoft Presidio</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Text Analysis</span>
            </CardTitle>
            <CardDescription>
              Enter text content to analyze for personally identifiable information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text to Analyze</Label>
              <Textarea
                id="text"
                placeholder="Enter text to analyze for PII/PHI..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px] resize-none"
              />
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{text.length} characters</span>
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => setText(sampleText)}
                  className="h-auto p-0"
                >
                  Use sample text
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ai-model">AI Model</Label>
                <Select defaultValue="presidio">
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presidio">Microsoft Presidio</SelectItem>
                    <SelectItem value="gpt4">GPT-4 Turbo</SelectItem>
                    <SelectItem value="claude">Claude-3 Sonnet</SelectItem>
                    <SelectItem value="gemini">Gemini Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confidence">Confidence Threshold</Label>
                <Select value={confidenceThreshold.toString()} onValueChange={(v) => setConfidenceThreshold(parseFloat(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.2">0.2 (Low)</SelectItem>
                    <SelectItem value="0.4">0.4 (Medium)</SelectItem>
                    <SelectItem value="0.6">0.6 (High)</SelectItem>
                    <SelectItem value="0.8">0.8 (Very High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Entity Types (Optional)</Label>
              <div className="flex flex-wrap gap-2">
                {COMMON_ENTITIES.slice(0, 8).map((entity) => (
                  <Badge
                    key={entity}
                    variant={selectedEntities.includes(entity) ? "default" : "outline"}
                    className="cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedEntities(prev => 
                        prev.includes(entity) 
                          ? prev.filter(e => e !== entity)
                          : [...prev, entity]
                      );
                    }}
                  >
                    {entity.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleDetection} 
              disabled={isLoading || !text.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Detect PII/PHI
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
              {results.length > 0 ? `Found ${results.length} potential PII/PHI entities` : 'Results will appear here after analysis'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <div className="space-y-4">
                {/* Statistics */}
                {statistics && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{results.length}</div>
                      <div className="text-sm text-muted-foreground">Entities Found</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {Math.round((results.reduce((sum, r) => sum + r.confidence, 0) / results.length) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Avg. Confidence</div>
                    </div>
                  </div>
                )}

                {/* Results Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Entity</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Confidence</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <code className="bg-muted px-2 py-1 rounded text-sm">
                              {result.text}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {result.entity_type.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getConfidenceColor(result.confidence)}>
                              {getConfidenceIcon(result.confidence)}
                              <span className="ml-1">{Math.round(result.confidence * 100)}%</span>
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {sessionId && (
                  <div className="text-xs text-muted-foreground text-center">
                    Session ID: {sessionId}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No analysis results yet. Enter text and click "Detect PII/PHI" to begin.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
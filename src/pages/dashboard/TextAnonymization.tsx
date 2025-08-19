import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, ShieldCheck, AlertTriangle, Copy, Eye, EyeOff } from 'lucide-react';
import { apiMethods, DetectedEntity, ANONYMIZATION_TYPES } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const TextAnonymization: React.FC = () => {
  const [text, setText] = useState('');
  const [anonymizationType, setAnonymizationType] = useState('mask');
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [anonymizedText, setAnonymizedText] = useState('');
  const [anonymizedEntities, setAnonymizedEntities] = useState<DetectedEntity[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showOriginal, setShowOriginal] = useState(false);
  const { toast } = useToast();

  // Sample text for demo
  const sampleText = `Hello, my name is John Doe and I work at Microsoft Corporation. 
My email address is john.doe@microsoft.com and my phone number is (555) 123-4567. 
I was born on January 15, 1985 and my Social Security Number is 123-45-6789. 
My credit card number is 4532-1234-5678-9012 and it expires on 12/25.
I live at 123 Main Street, Seattle, WA 98101.`;

  const handleAnonymization = async () => {
    if (!text.trim()) {
      setError('Please enter some text to anonymize');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnonymizedText('');
    setAnonymizedEntities([]);
    
    try {
      const response = await apiMethods.anonymizeText({
        text,
        anonymization_type: anonymizationType,
        entities: selectedEntities.length > 0 ? selectedEntities : undefined,
        config: {
          mask_char: '*'
        }
      });
      
      setAnonymizedText(response.anonymized_text);
      setAnonymizedEntities(response.anonymized_entities);
      setStatistics(response.statistics);
      setSessionId(response.session_id);
      
      toast({
        title: "Anonymization Complete",
        description: `Anonymized ${response.anonymized_entities.length} entities using ${anonymizationType}`,
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Anonymization failed';
      setError(errorMessage);
      toast({
        title: "Anonymization Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Anonymized text has been copied to your clipboard",
    });
  };

  const getAnonymizationTypeDescription = (type: string) => {
    const typeInfo = ANONYMIZATION_TYPES.find(t => t.value === type);
    return typeInfo?.label || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Text Anonymization</h1>
          <p className="text-muted-foreground">Anonymize PII/PHI in text data using various techniques</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5" />
              <span>Text Anonymization</span>
            </CardTitle>
            <CardDescription>
              Enter text content and select anonymization method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text to Anonymize</Label>
              <Textarea
                id="text"
                placeholder="Enter text to anonymize..."
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

            <div className="space-y-2">
              <Label htmlFor="anonymization-type">Anonymization Method</Label>
              <Select value={anonymizationType} onValueChange={setAnonymizationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select anonymization method" />
                </SelectTrigger>
                <SelectContent>
                  {ANONYMIZATION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {getAnonymizationTypeDescription(anonymizationType)}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Entity Types (Optional)</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Leave empty to anonymize all detected entities
              </p>
              <div className="flex flex-wrap gap-2">
                {['PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'CREDIT_CARD', 'SSN', 'DATE_TIME', 'LOCATION', 'ORGANIZATION'].map((entity) => (
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
              onClick={handleAnonymization} 
              disabled={isLoading || !text.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Anonymizing...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Anonymize Text
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Anonymization Results</CardTitle>
            <CardDescription>
              {anonymizedText ? 'Anonymized text and entity details' : 'Results will appear here after anonymization'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {anonymizedText ? (
              <div className="space-y-4">
                {/* Statistics */}
                {statistics && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{anonymizedEntities.length}</div>
                      <div className="text-sm text-muted-foreground">Entities Anonymized</div>
                    </div>
                    <div className="text-center p-3 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">✓</div>
                      <div className="text-sm text-muted-foreground">Protected</div>
                    </div>
                  </div>
                )}

                {/* Anonymized Text Display */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Anonymized Text</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowOriginal(!showOriginal)}
                      >
                        {showOriginal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {showOriginal ? 'Hide Original' : 'Show Original'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(anonymizedText)}
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {showOriginal ? text : anonymizedText}
                    </pre>
                  </div>
                </div>

                {/* Anonymized Entities Table */}
                {anonymizedEntities.length > 0 && (
                  <div className="space-y-2">
                    <Label>Anonymized Entities</Label>
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Original</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Anonymized</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {anonymizedEntities.map((entity, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                <code className="bg-muted px-2 py-1 rounded text-sm">
                                  {entity.text}
                                </code>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {entity.entity_type.replace('_', ' ')}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-success/10 text-success border-success/20">
                                  {anonymizationType === 'mask' ? '***' : 
                                   anonymizationType === 'replace' ? '[REDACTED]' :
                                   anonymizationType === 'hash' ? '[HASHED]' :
                                   '[ANONYMIZED]'}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {sessionId && (
                  <div className="text-xs text-muted-foreground text-center">
                    Session ID: {sessionId}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No anonymization results yet. Enter text and select a method to begin.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
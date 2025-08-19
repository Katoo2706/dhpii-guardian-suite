import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Image as ImageIcon, Upload, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { apiMethods, DetectedEntity, COMMON_ENTITIES } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const ImageDetection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('en');
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.4);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DetectedEntity[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tiff']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleDetection = async () => {
    if (!selectedFile) {
      setError('Please select an image file to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults([]);
    
    try {
      const response = await apiMethods.detectImage(
        selectedFile,
        language,
        selectedEntities.length > 0 ? selectedEntities : undefined,
        confidenceThreshold
      );
      
      setResults(response.results);
      setStatistics(response.statistics);
      setSessionId(response.session_id);
      
      toast({
        title: "Detection Complete",
        description: `Found ${response.results.length} potential PII/PHI entities in image`,
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
          <ImageIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Image Detection</h1>
          <p className="text-muted-foreground">Detect PII/PHI in images using OCR and Presidio</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Image Upload</span>
            </CardTitle>
            <CardDescription>
              Upload an image file to analyze for personally identifiable information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Upload */}
            <div className="space-y-2">
              <Label>Image File</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-primary bg-primary/5' 
                    : selectedFile 
                      ? 'border-success bg-success/5' 
                      : 'border-border hover:border-primary/50 hover:bg-muted/30'
                }`}
              >
                <input {...getInputProps()} />
                {selectedFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="w-8 h-8 text-success mx-auto" />
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-sm">
                      {isDragActive ? 'Drop the image here...' : 'Drag & drop an image here, or click to select'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports JPEG, PNG, GIF, BMP, TIFF (max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="border rounded-lg p-2">
                  <img 
                    src={imagePreview} 
                    alt="Upload preview" 
                    className="max-w-full h-48 object-contain mx-auto rounded"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
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
              disabled={isLoading || !selectedFile}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Detect PII/PHI in Image
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
                        <TableHead>Position</TableHead>
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
                          <TableCell className="text-xs text-muted-foreground">
                            {result.start}-{result.end}
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
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No analysis results yet. Upload an image and click "Detect PII/PHI" to begin.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
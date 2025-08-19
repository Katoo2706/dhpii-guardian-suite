import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, ImageIcon, Upload, AlertTriangle, CheckCircle, Download, Eye } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { apiMethods, DetectedEntity, COMMON_ENTITIES } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const ImageAnonymization: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [anonymizationType, setAnonymizationType] = useState('redaction');
  const [language, setLanguage] = useState('en');
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.4);
  const [fillColor, setFillColor] = useState('black');
  const [isLoading, setIsLoading] = useState(false);
  const [anonymizedEntities, setAnonymizedEntities] = useState<DetectedEntity[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [anonymizedImageUrl, setAnonymizedImageUrl] = useState<string>('');
  const [anonymizedImageId, setAnonymizedImageId] = useState<string>('');
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

  const handleAnonymization = async () => {
    if (!selectedFile) {
      setError('Please select an image file to anonymize');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnonymizedEntities([]);
    setAnonymizedImageUrl('');
    
    try {
      const response = await apiMethods.anonymizeImage(
        selectedFile,
        anonymizationType,
        language,
        selectedEntities.length > 0 ? selectedEntities : undefined,
        confidenceThreshold,
        fillColor
      );
      
      setAnonymizedEntities(response.anonymized_entities);
      setStatistics(response.statistics);
      setSessionId(response.session_id);
      setAnonymizedImageUrl(response.anonymized_image_url);
      setAnonymizedImageId(response.anonymized_image_id);
      
      toast({
        title: "Anonymization Complete",
        description: `Anonymized ${response.anonymized_entities.length} entities in image`,
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

  const downloadAnonymizedImage = () => {
    if (anonymizedImageUrl) {
      const link = document.createElement('a');
      link.href = anonymizedImageUrl;
      link.download = `anonymized_${anonymizedImageId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <ImageIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Image Anonymization</h1>
          <p className="text-muted-foreground">Anonymize PII/PHI in images with visual redaction</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Image Upload & Settings</span>
            </CardTitle>
            <CardDescription>
              Upload an image file and configure anonymization settings
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
                <Label>Original Preview</Label>
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
                <Label htmlFor="anonymization-type">Anonymization Method</Label>
                <Select value={anonymizationType} onValueChange={setAnonymizationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="redaction">Redaction (Black boxes)</SelectItem>
                    <SelectItem value="blur">Blur effect</SelectItem>
                    <SelectItem value="pixelation">Pixelation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fill-color">Fill Color</Label>
                <Select value={fillColor} onValueChange={setFillColor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

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
              onClick={handleAnonymization} 
              disabled={isLoading || !selectedFile}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Anonymizing Image...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Anonymize Image
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
              {anonymizedImageUrl ? 'Anonymized image and entity details' : 'Results will appear here after anonymization'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {anonymizedImageUrl ? (
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

                {/* Anonymized Image Display */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Anonymized Image</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadAnonymizedImage}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-2">
                    <img 
                      src={anonymizedImageUrl} 
                      alt="Anonymized result" 
                      className="max-w-full h-64 object-contain mx-auto rounded"
                    />
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
                            <TableHead>Entity</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Status</TableHead>
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
                              <TableCell className="text-xs text-muted-foreground">
                                {entity.start}-{entity.end}
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-success/10 text-success border-success/20">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Anonymized
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
                    Session ID: {sessionId} | Image ID: {anonymizedImageId}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No anonymization results yet. Upload an image and configure settings to begin.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
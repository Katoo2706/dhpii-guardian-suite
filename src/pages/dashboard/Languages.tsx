import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Languages as LanguagesIcon, Search, Globe, AlertTriangle } from 'lucide-react';
import { apiMethods } from '@/lib/api';

export const Languages: React.FC = () => {
  const [languages, setLanguages] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Mock languages data - in real app this would come from API
  const mockLanguages = {
    'en': 'English',
    'es': 'Spanish',
    'de': 'German',
    'fr': 'French',
    'it': 'Italian',
    'pt': 'Portuguese',
    'nl': 'Dutch',
    'ru': 'Russian',
    'zh': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ar': 'Arabic',
    'he': 'Hebrew',
    'pl': 'Polish',
    'cs': 'Czech',
    'sk': 'Slovak',
    'hu': 'Hungarian',
    'ro': 'Romanian',
    'bg': 'Bulgarian',
    'hr': 'Croatian',
    'sl': 'Slovenian',
    'lt': 'Lithuanian',
    'lv': 'Latvian',
    'et': 'Estonian',
    'fi': 'Finnish',
    'sv': 'Swedish',
    'no': 'Norwegian',
    'da': 'Danish',
    'is': 'Icelandic',
    'el': 'Greek',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'sr': 'Serbian',
    'mk': 'Macedonian',
    'sq': 'Albanian',
    'bs': 'Bosnian',
    'cnr': 'Montenegrin',
    'mt': 'Maltese',
    'ga': 'Irish',
    'cy': 'Welsh',
    'eu': 'Basque',
    'ca': 'Catalan',
    'gl': 'Galician',
    'hi': 'Hindi',
    'bn': 'Bengali',
    'ta': 'Tamil',
    'te': 'Telugu',
    'mr': 'Marathi',
    'gu': 'Gujarati',
    'kn': 'Kannada',
    'ml': 'Malayalam',
    'pa': 'Punjabi',
    'ur': 'Urdu',
    'ne': 'Nepali',
    'th': 'Thai',
    'vi': 'Vietnamese',
    'id': 'Indonesian',
    'ms': 'Malay',
    'fil': 'Filipino'
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const langs = await apiMethods.getSupportedLanguages();
      setLanguages(langs);
    } catch (err: any) {
      console.error('Failed to load languages from API, using mock data:', err);
      // Use mock data as fallback
      setLanguages(mockLanguages);
      setError('Using cached language data. API connection may be unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLanguages = Object.entries(languages).filter(([code, name]) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRegionBadge = (code: string) => {
    if (['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'ru'].includes(code)) {
      return 'Primary';
    }
    if (['zh', 'ja', 'ko', 'ar', 'he'].includes(code)) {
      return 'Extended';
    }
    return 'Regional';
  };

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'Primary':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Extended':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted/30 text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <LanguagesIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Supported Languages</h1>
          <p className="text-muted-foreground">Languages available for PII/PHI detection and anonymization</p>
        </div>
      </div>

      {/* Search and Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Languages</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by language name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-primary" />
              <div>
                <div className="text-2xl font-bold">{Object.keys(languages).length}</div>
                <div className="text-sm text-muted-foreground">Total Languages</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <LanguagesIcon className="w-4 h-4 text-accent" />
              <div>
                <div className="text-2xl font-bold">{filteredLanguages.length}</div>
                <div className="text-sm text-muted-foreground">
                  {searchTerm ? 'Filtered' : 'Available'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Languages Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Language Support Matrix</CardTitle>
          <CardDescription>
            Complete list of languages supported by the DHPII Platform for text and image analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              <LanguagesIcon className="w-12 h-12 mx-auto mb-4 opacity-50 animate-pulse" />
              <p>Loading supported languages...</p>
            </div>
          ) : filteredLanguages.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredLanguages.map(([code, name]) => (
                <div key={code} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-muted-foreground font-mono">{code}</div>
                  </div>
                  <Badge className={getRegionColor(getRegionBadge(code))}>
                    {getRegionBadge(code)}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No languages found matching "{searchTerm}"</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Language Categories */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Badge className="bg-primary/10 text-primary border-primary/20">Primary</Badge>
              <span>Primary Languages</span>
            </CardTitle>
            <CardDescription>Most commonly used languages with full feature support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(languages)
                .filter(([code]) => ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'ru'].includes(code))
                .map(([code, name]) => (
                  <div key={code} className="flex justify-between items-center text-sm">
                    <span>{name}</span>
                    <span className="font-mono text-muted-foreground">{code}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Badge className="bg-accent/10 text-accent border-accent/20">Extended</Badge>
              <span>Extended Support</span>
            </CardTitle>
            <CardDescription>Major world languages with comprehensive PII detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(languages)
                .filter(([code]) => ['zh', 'zh-TW', 'ja', 'ko', 'ar', 'he', 'hi', 'th'].includes(code))
                .map(([code, name]) => (
                  <div key={code} className="flex justify-between items-center text-sm">
                    <span>{name}</span>
                    <span className="font-mono text-muted-foreground">{code}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Badge className="bg-muted/30 text-muted-foreground border-border">Regional</Badge>
              <span>Regional Languages</span>
            </CardTitle>
            <CardDescription>Regional and specialized language support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(languages)
                .filter(([code]) => !['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'zh', 'zh-TW', 'ja', 'ko', 'ar', 'he', 'hi', 'th'].includes(code))
                .slice(0, 8)
                .map(([code, name]) => (
                  <div key={code} className="flex justify-between items-center text-sm">
                    <span>{name}</span>
                    <span className="font-mono text-muted-foreground">{code}</span>
                  </div>
                ))}
              {Object.keys(languages).length > 16 && (
                <div className="text-sm text-muted-foreground italic">
                  And {Object.keys(languages).length - 16} more...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
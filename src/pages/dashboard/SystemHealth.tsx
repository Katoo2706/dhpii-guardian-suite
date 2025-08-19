import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Activity, Server, Database, Shield, Wifi, RefreshCw, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { apiMethods } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface HealthStatus {
  service: string;
  status: 'healthy' | 'warning' | 'error';
  response_time?: number;
  last_check: string;
  details?: string;
}

export const SystemHealth: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthStatus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  // Mock health data - in real app this would come from API
  const mockHealthData: HealthStatus[] = [
    {
      service: 'DHPII API Server',
      status: 'healthy',
      response_time: 45,
      last_check: new Date().toISOString(),
      details: 'All endpoints responding normally'
    },
    {
      service: 'Microsoft Presidio Engine',
      status: 'healthy',
      response_time: 120,
      last_check: new Date().toISOString(),
      details: 'PII/PHI detection engine operational'
    },
    {
      service: 'Database Connection',
      status: 'healthy',
      response_time: 23,
      last_check: new Date().toISOString(),
      details: 'PostgreSQL connection pool stable'
    },
    {
      service: 'Image Processing Service',
      status: 'warning',
      response_time: 890,
      last_check: new Date().toISOString(),
      details: 'OCR processing slower than expected'
    },
    {
      service: 'Authentication Service',
      status: 'healthy',
      response_time: 67,
      last_check: new Date().toISOString(),
      details: 'User authentication working properly'
    },
    {
      service: 'File Storage (S3)',
      status: 'healthy',
      response_time: 156,
      last_check: new Date().toISOString(),
      details: 'Image upload and anonymized file storage operational'
    }
  ];

  useEffect(() => {
    checkSystemHealth();
    // Set up periodic health checks every 30 seconds
    const interval = setInterval(checkSystemHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkSystemHealth = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Check main API health
      await apiMethods.healthCheck();
      
      // For demo purposes, use mock data
      // In real app, this would aggregate health from multiple services
      setHealthData(mockHealthData);
      setLastUpdate(new Date());
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Health check failed';
      setError(errorMessage);
      
      // Still show mock data but mark API as unhealthy
      const unhealthyData = mockHealthData.map(item => 
        item.service === 'DHPII API Server' 
          ? { ...item, status: 'error' as const, details: errorMessage }
          : item
      );
      setHealthData(unhealthyData);
      setLastUpdate(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-success/10 text-success border-success/20">Healthy</Badge>;
      case 'warning':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case 'error':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getServiceIcon = (service: string) => {
    if (service.includes('API')) return <Server className="w-5 h-5" />;
    if (service.includes('Database')) return <Database className="w-5 h-5" />;
    if (service.includes('Auth')) return <Shield className="w-5 h-5" />;
    if (service.includes('Storage')) return <Wifi className="w-5 h-5" />;
    return <Activity className="w-5 h-5" />;
  };

  const overallHealth = healthData.every(item => item.status === 'healthy') 
    ? 'healthy' 
    : healthData.some(item => item.status === 'error') 
      ? 'error' 
      : 'warning';

  const avgResponseTime = healthData.length > 0 
    ? Math.round(healthData.reduce((sum, item) => sum + (item.response_time || 0), 0) / healthData.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">System Health</h1>
            <p className="text-muted-foreground">Monitor platform services and performance</p>
          </div>
        </div>
        
        <Button 
          onClick={checkSystemHealth} 
          disabled={isLoading}
          variant="outline"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      {/* Overall Status */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              {getStatusIcon(overallHealth)}
              <div>
                <div className="text-2xl font-bold">
                  {overallHealth === 'healthy' ? 'All Systems' : 
                   overallHealth === 'warning' ? 'Degraded' : 'Issues'}
                </div>
                <div className="text-sm text-muted-foreground">Overall Status</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <div>
                <div className="text-2xl font-bold">
                  {healthData.filter(item => item.status === 'healthy').length}
                </div>
                <div className="text-sm text-muted-foreground">Healthy Services</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-primary" />
              <div>
                <div className="text-2xl font-bold">{avgResponseTime}ms</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Server className="w-4 h-4 text-accent" />
              <div>
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime (24h)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to check system health: {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Service Details */}
      <Card>
        <CardHeader>
          <CardTitle>Service Status Details</CardTitle>
          <CardDescription>
            {lastUpdate ? `Last updated: ${lastUpdate.toLocaleTimeString()}` : 'No recent updates'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthData.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted/30 rounded-lg flex items-center justify-center">
                    {getServiceIcon(service.service)}
                  </div>
                  <div>
                    <div className="font-medium">{service.service}</div>
                    <div className="text-sm text-muted-foreground">{service.details}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {service.response_time && (
                    <div className="text-right">
                      <div className="text-sm font-medium">{service.response_time}ms</div>
                      <div className="text-xs text-muted-foreground">Response Time</div>
                    </div>
                  )}
                  {getStatusBadge(service.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Detections Today</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Anonymizations Today</span>
                <span className="font-medium">892</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Images Processed</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Sessions</span>
                <span className="font-medium">23</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">CPU Usage</span>
                <span className="font-medium">34%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Memory Usage</span>
                <span className="font-medium">2.1 GB / 8 GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Storage Used</span>
                <span className="font-medium">45.2 GB / 500 GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Network I/O</span>
                <span className="font-medium">1.2 MB/s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
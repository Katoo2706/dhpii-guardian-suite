import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Search, ShieldCheck, Activity, Database, Zap, Lock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: 'Multi-Format PII/PHI Detection',
      description: 'Support for text files, images, DICOM medical files, and structured data formats'
    },
    {
      icon: ShieldCheck,
      title: 'Advanced Anonymization',
      description: 'Multiple anonymization techniques including masking, hashing, pseudonymization, replacement, and encryption'
    },
    {
      icon: Database,
      title: 'Database Integration',
      description: 'Direct connectivity to PostgreSQL, MySQL, data warehouses, and data lakehouses'
    },
    {
      icon: Activity,
      title: 'Comprehensive Monitoring',
      description: 'Real-time dashboards, alerting systems, and audit trails'
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Authentication, authorization, and comprehensive policy management'
    },
    {
      icon: Zap,
      title: 'AI-Driven Extensions',
      description: 'MCP server integration for external system connectors and governance automation'
    }
  ];

  const useCases = [
    {
      title: 'Healthcare',
      description: 'HIPAA-compliant PHI detection and anonymization in medical records and DICOM images',
      badge: 'HIPAA'
    },
    {
      title: 'Financial Services',
      description: 'PCI DSS compliance for payment card data and financial records',
      badge: 'PCI DSS'
    },
    {
      title: 'Enterprise Data Governance',
      description: 'Automated sensitive data discovery and cataloging across data lakes',
      badge: 'GDPR'
    },
    {
      title: 'Regulatory Compliance',
      description: 'GDPR, CCPA, and other privacy regulation compliance automation',
      badge: 'CCPA'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">DHPII Platform</h1>
                <p className="text-xs text-muted-foreground">Data Privacy & Governance</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Eye className="w-4 h-4 mr-2" />
              Access Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Enterprise-Grade Data Privacy Platform
            </Badge>
            
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Comprehensive Data Privacy &{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Governance Platform
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Leverage Microsoft Presidio and advanced analytics to deliver enterprise-grade data privacy solutions. 
              Automated detection and de-identification of sensitive data across text, images, DICOM files, 
              and structured databases.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8 py-3"
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 border-primary/20 hover:bg-primary/5"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with a microservices architecture comprising enterprise-grade components
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Use Cases</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by organizations across industries for critical data privacy needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      {useCase.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Secure Your Data?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start protecting your sensitive information today with our comprehensive data privacy platform.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8 py-3"
            >
              Access Your Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">DHPII Platform</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 DHPII Platform. Enterprise-grade data privacy and governance solutions.
          </p>
        </div>
      </footer>
    </div>
  );
};
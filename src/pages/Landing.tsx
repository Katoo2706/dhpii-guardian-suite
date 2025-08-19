import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, Brain, Eye, Cpu, Network, Bot, 
  ChartBar, Lock, Microscope, Search, 
  Database, Zap, Activity, ShieldCheck,
  ArrowRight, CheckCircle, Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import aiHeroBg from '@/assets/ai-hero-bg.jpg';
import aiInnovationBg from '@/assets/ai-innovation-bg.jpg';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const aiTechnologies = [
    {
      icon: Brain,
      title: 'Natural Language Processing',
      description: 'Advanced NLP algorithms powered by Microsoft Presidio to detect and classify sensitive information in unstructured text with 99.8% accuracy',
      highlight: 'State-of-the-art'
    },
    {
      icon: Eye,
      title: 'Computer Vision',
      description: 'Deep learning models for OCR and visual content analysis to identify PII/PHI in medical images, documents, and DICOM files',
      highlight: 'AI-Powered'
    },
    {
      icon: Cpu,
      title: 'Machine Learning Engine',
      description: 'Adaptive ML models that continuously learn and improve detection accuracy across multiple languages and data formats',
      highlight: 'Self-Learning'
    },
    {
      icon: Network,
      title: 'Neural Network Architecture',
      description: 'Distributed neural networks enabling real-time processing of massive datasets with enterprise-scale performance',
      highlight: 'Enterprise-Scale'
    }
  ];

  const capabilities = [
    {
      icon: Bot,
      title: 'AI-Driven Automation',
      description: 'Intelligent workflow automation with MCP server integration'
    },
    {
      icon: ChartBar,
      title: 'Predictive Analytics',
      description: 'Advanced analytics for risk assessment and compliance forecasting'
    },
    {
      icon: Microscope,
      title: 'Deep Analysis',
      description: 'Comprehensive examination of data patterns and privacy risks'
    },
    {
      icon: Shield,
      title: 'Privacy Protection',
      description: 'Multi-layered security with adaptive anonymization techniques'
    }
  ];

  const industries = [
    {
      title: 'Healthcare & Life Sciences',
      description: 'HIPAA-compliant AI solutions for medical records, DICOM imaging, and clinical research data',
      badge: 'HIPAA',
      icon: Activity,
      stats: '99.9% accuracy in PHI detection'
    },
    {
      title: 'Financial Services',
      description: 'PCI DSS compliant AI for payment data, transaction records, and regulatory reporting',
      badge: 'PCI DSS',
      icon: Lock,
      stats: 'Real-time fraud detection'
    },
    {
      title: 'Government & Defense',
      description: 'Advanced classification and redaction for sensitive government documents and communications',
      badge: 'FedRAMP',
      icon: ShieldCheck,
      stats: 'Top Secret clearance ready'
    },
    {
      title: 'Technology & Innovation',
      description: 'GDPR and CCPA compliance for data lakes, AI training datasets, and customer analytics',
      badge: 'GDPR',
      icon: Database,
      stats: 'Petabyte-scale processing'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <header className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">DHPII Platform</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Data Privacy & Governance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Solutions</Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Technology</Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Industries</Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Resources</Button>
              </nav>
              <Button 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                <Eye className="w-4 h-4 mr-2" />
                Access Platform
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with AI Focus */}
      <section 
        className="relative py-24 px-6 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${aiHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              Leading AI Innovation in Data Privacy
            </Badge>
            
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              AI-Powered Data Privacy
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Intelligence Platform
              </span>
            </h1>
            
            <p className="text-xl mb-10 leading-relaxed text-white/90 max-w-3xl mx-auto">
              Harness the power of advanced AI, machine learning, and neural networks to automatically 
              detect, classify, and protect sensitive data across your entire enterprise ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 font-semibold"
              >
                Explore AI Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                View Live Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Showcase */}
      <section className="py-20 px-6 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Advanced AI Technologies
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Cutting-Edge AI at Your Service
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform leverages the latest breakthroughs in artificial intelligence, 
              machine learning, and deep learning to deliver unparalleled data privacy protection.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {aiTechnologies.map((tech, index) => (
              <Card key={index} className="border-border/50 hover:shadow-xl transition-all duration-500 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4">
                      <tech.icon className="w-7 h-7 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                      {tech.highlight}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
                    {tech.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-card/30 hover:bg-card/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <capability.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{capability.title}</h3>
                <p className="text-muted-foreground text-sm">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section 
        className="py-20 px-6 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${aiInnovationBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              Industry Solutions
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Trusted Across Critical Industries
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our AI-powered platform delivers specialized solutions for the most demanding 
              regulatory environments and data protection requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="border-white/20 hover:shadow-2xl transition-all duration-500 bg-white/10 backdrop-blur-lg hover:bg-white/15">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center">
                      <industry.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-success/20 text-white border-success/30 backdrop-blur-sm">
                      {industry.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white mb-2">{industry.title}</CardTitle>
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-white/70">{industry.stats}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/80 text-base leading-relaxed">
                    {industry.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Proven AI Performance
            </h2>
            <p className="text-xl text-muted-foreground">
              Industry-leading accuracy and performance metrics
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { metric: '99.8%', label: 'AI Detection Accuracy' },
              { metric: '<50ms', label: 'Real-time Processing' },
              { metric: '127+', label: 'PII/PHI Entity Types' },
              { metric: '45+', label: 'Supported Languages' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.metric}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-card">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready for AI-Powered Data Protection?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join leading organizations using our AI platform to secure sensitive data 
              and maintain compliance across their entire enterprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8 py-4"
              >
                Start Your AI Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-primary/20 hover:bg-primary/5"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-muted border-t border-border py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-bold text-foreground">DHPII Platform</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Leading AI-powered data privacy and governance solutions for enterprise organizations worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Solutions</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Healthcare Privacy</div>
                <div>Financial Compliance</div>
                <div>Data Governance</div>
                <div>AI/ML Protection</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Technology</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Natural Language Processing</div>
                <div>Computer Vision</div>
                <div>Machine Learning</div>
                <div>Neural Networks</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Resources</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Documentation</div>
                <div>API Reference</div>
                <div>Case Studies</div>
                <div>Support Center</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 DHPII Platform. Advanced AI-powered data privacy and governance solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
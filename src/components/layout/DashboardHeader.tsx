import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Bell, 
  Settings, 
  Brain,
  Activity,
  Shield,
  Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardHeader: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="hover:bg-muted/50" />
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-semibold text-foreground">DHPII Platform</h1>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                  AI-Powered
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Enterprise Data Privacy Intelligence</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* AI Status Indicators */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-xs">
              <Activity className="w-3 h-3 text-success animate-pulse" />
              <span className="text-muted-foreground">AI Active</span>
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <Shield className="w-3 h-3 text-primary" />
              <span className="text-muted-foreground">Protected</span>
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <Zap className="w-3 h-3 text-accent" />
              <span className="text-muted-foreground">99.8% Accuracy</span>
            </div>
          </div>
          
          <div className="w-px h-6 bg-border hidden lg:block" />
          
          {/* System Status */}
          <Badge variant="outline" className="text-success border-success/20 bg-success/10">
            System Online
          </Badge>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.username}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role || 'Super Admin'}</p>
            </div>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm">
                {user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};
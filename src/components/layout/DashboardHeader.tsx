import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const DashboardHeader: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-border bg-card shadow-sm">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="hover:bg-muted/50" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              DHPII Platform Dashboard
            </h2>
            <p className="text-sm text-muted-foreground">
              Data Privacy & Governance Platform
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-success border-success/20 bg-success/10">
            System Online
          </Badge>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user?.username}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};
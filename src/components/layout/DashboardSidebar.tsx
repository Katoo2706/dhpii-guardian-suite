import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Search, 
  Shield, 
  Activity, 
  FileText, 
  Image, 
  Languages,
  ShieldCheck,
  ImageIcon,
  LogOut,
  Database,
  Tags,
  Bot,
  Network,
  Settings
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const detectionItems = [
  { title: 'Text Detection', url: '/dashboard/detection/text', icon: FileText },
  { title: 'Image Detection', url: '/dashboard/detection/image', icon: Image },
  { title: 'Languages', url: '/dashboard/detection/languages', icon: Languages },
];

const anonymizationItems = [
  { title: 'Text Anonymization', url: '/dashboard/anonymization/text', icon: ShieldCheck },
  { title: 'Image Anonymization', url: '/dashboard/anonymization/image', icon: ImageIcon },
];

const integrationItems = [
  { title: 'Integrations', url: '/dashboard/integrations', icon: Database },
  { title: 'Data Catalog', url: '/dashboard/catalog', icon: Tags },
  { title: 'MCP Server', url: '/dashboard/mcp', icon: Bot },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { logout } = useAuth();
  
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => location.pathname === path;
  
  const getNavClasses = (path: string) => 
    isActive(path) 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg">DHPII</h1>
              <p className="text-xs text-muted-foreground">Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Detection
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {detectionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Anonymization
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {anonymizationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Enterprise
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {integrationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/dashboard/health" 
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${getNavClasses('/dashboard/health')}`}
                  >
                    <Activity className="w-4 h-4 mr-3" />
                    {!isCollapsed && <span>System Health</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <Button 
          variant="ghost" 
          onClick={logout}
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-3" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoginForm } from "./components/auth/LoginForm";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Landing } from "./pages/Landing";
import { TextDetection } from "./pages/dashboard/TextDetection";
import { ImageDetection } from "./pages/dashboard/ImageDetection";
import { Languages } from "./pages/dashboard/Languages";
import { TextAnonymization } from "./pages/dashboard/TextAnonymization";
import { ImageAnonymization } from "./pages/dashboard/ImageAnonymization";
import { SystemHealth } from "./pages/dashboard/SystemHealth";
import { Integrations } from "./pages/dashboard/Integrations";
import { DataCatalog } from "./pages/dashboard/DataCatalog";
import { MCPServer } from "./pages/dashboard/MCPServer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard/detection/text" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            } />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              {/* Default redirect to text detection */}
              <Route index element={<Navigate to="/dashboard/detection/text" />} />
              
              {/* Detection Routes */}
              <Route path="detection/text" element={<TextDetection />} />
              <Route path="detection/image" element={<ImageDetection />} />
              <Route path="detection/languages" element={<Languages />} />
              
              {/* Anonymization Routes */}
              <Route path="anonymization/text" element={<TextAnonymization />} />
              <Route path="anonymization/image" element={<ImageAnonymization />} />
              
              {/* Enterprise Routes */}
              <Route path="integrations" element={<Integrations />} />
              <Route path="catalog" element={<DataCatalog />} />
              <Route path="mcp" element={<MCPServer />} />
              
              {/* System Routes */}
              <Route path="health" element={<SystemHealth />} />
            </Route>
            
            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

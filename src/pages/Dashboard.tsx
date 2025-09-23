import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Settings, 
  LogOut,
  User
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: FolderOpen, label: "Projects", path: "/dashboard/projects" },
    { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }
      
      setUser(session.user);
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Berhasil",
        description: "Logout berhasil!",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal logout",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-border p-6">
            <h2 className="text-lg font-semibold gradient-text">
              Admin Dashboard
            </h2>
            <div className="mt-2 flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    isActive ? "bg-primary/10 text-primary border-primary/20" : ""
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        <div className="p-6">
          {location.pathname === "/dashboard" ? (
            <DashboardOverview />
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Dashboard Overview</h1>
        <p className="text-muted-foreground">Selamat datang di admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 glass-effect border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Projects
              </p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <FolderOpen className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 glass-effect border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Messages
              </p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 glass-effect border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Skills
              </p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <Settings className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 glass-effect border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active
              </p>
              <p className="text-2xl font-bold text-green-500">Online</p>
            </div>
            <LayoutDashboard className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 glass-effect border-primary/20">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FolderOpen className="mr-2 h-4 w-4" />
              Tambah Project Baru
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Lihat Pesan Terbaru
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Update Settings
            </Button>
          </div>
        </Card>

        <Card className="p-6 glass-effect border-primary/20">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>• Dashboard diakses</p>
            <p>• Login berhasil</p>
            <p>• System ready</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
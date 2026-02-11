import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings as SettingsIcon, 
  Activity,
  User,
  LogOut,
  Bell,
  Search,
  ShieldCheck,
  ShieldAlert,
  Menu,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppContext } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import AIChatbot from '@/components/AIChatbot';
import NotificationBell from '@/components/NotificationBell';

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Hospital Logs', icon: FileText, path: '/logs' },
    { name: 'Hospital Watchlist', icon: ShieldAlert, path: '/watchlist' },
    { name: 'Settings', icon: SettingsIcon, path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-tight leading-none text-white">Shasthya</h1>
          <span className="text-xs opacity-70 text-white">Rakshak Dashboard</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-sidebar-accent/50",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-foreground shadow-lg" 
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 space-y-4">
        {/* System Status */}
        <div className="p-4 bg-sidebar-accent/30 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">System Status</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-white/70" />
            <span className="text-sm font-medium text-white/90">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background font-sans pb-12">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex-col hidden lg:flex border-r border-sidebar-border shadow-xl">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-border/50 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 bg-sidebar border-none">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            
            <h2 className="text-lg lg:text-xl font-bold text-primary tracking-tight truncate">
              Admin Console <span className="text-muted-foreground font-normal mx-1 lg:mx-2 hidden sm:inline">|</span> 
              <span className="text-muted-foreground font-medium hidden sm:inline">Dept of Health</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search claims or hospitals..." 
                className="pl-10 bg-muted/50 border-transparent focus-visible:bg-white focus-visible:ring-1 transition-all rounded-full h-10"
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="text-muted-foreground hover:bg-muted rounded-full"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <NotificationBell />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="pl-2 pr-1 h-12 rounded-full hover:bg-muted transition-all">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-muted shadow-sm">
                      <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start text-sm pr-2">
                      <span className="font-semibold text-primary">Dr. Sourav Ganguly</span>
                      <span className="text-xs text-muted-foreground">Admin Secretary</span>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-2xl border-border/50">
                <DropdownMenuLabel className="font-semibold p-3 text-muted-foreground">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3 cursor-pointer rounded-lg mx-1 my-0.5">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="p-3 cursor-pointer rounded-lg mx-1 my-0.5 text-destructive focus:text-destructive focus:bg-destructive/5"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-background p-8">
          <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <footer className="py-6 px-8 bg-card border-t border-border/50 text-center text-sm text-muted-foreground">
          © Shasthya Rakshak 2026. All rights reserved.
        </footer>
      </main>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default AdminLayout;

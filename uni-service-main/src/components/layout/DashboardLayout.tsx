/**
 * Dashboard Layout Component - Uni Service Marketplace
 * 
 * Layout wrapper for all dashboard pages (student, provider, admin).
 * Includes sidebar navigation and responsive design.
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  LayoutDashboard, 
  FileText, 
  Star, 
  Settings,
  LogOut,
  Users,
  BarChart3,
  Briefcase,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/lib/types';

// ============= Navigation Config =============

interface NavConfig {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const studentNavItems: NavConfig[] = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/student' },
  { title: 'My Requests', icon: FileText, href: '/student/requests' },
  { title: 'My Reviews', icon: Star, href: '/student/reviews' },
  { title: 'Settings', icon: Settings, href: '/student/settings' },
];

const providerNavItems: NavConfig[] = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/provider' },
  { title: 'Available Jobs', icon: Briefcase, href: '/provider/jobs' },
  { title: 'My Jobs', icon: CheckCircle, href: '/provider/my-jobs' },
  { title: 'Reviews', icon: Star, href: '/provider/reviews' },
  { title: 'Settings', icon: Settings, href: '/provider/settings' },
];

const adminNavItems: NavConfig[] = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { title: 'Users', icon: Users, href: '/admin/users' },
  { title: 'Services', icon: FileText, href: '/admin/services' },
  { title: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { title: 'Settings', icon: Settings, href: '/admin/settings' },
];

const getNavItems = (role: UserRole): NavConfig[] => {
  switch (role) {
    case 'student': return studentNavItems;
    case 'provider': return providerNavItems;
    case 'admin': return adminNavItems;
    default: return [];
  }
};

const getRoleColor = (role: UserRole): string => {
  switch (role) {
    case 'student': return 'bg-student text-student-foreground';
    case 'provider': return 'bg-provider text-provider-foreground';
    case 'admin': return 'bg-admin text-admin-foreground';
    default: return 'bg-primary text-primary-foreground';
  }
};

// ============= Component Props =============

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard layout with sidebar navigation
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const navItems = getNavItems(user.role);
  const roleColor = getRoleColor(user.role);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border h-16 flex items-center px-4">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <Link to="/" className="flex items-center gap-2 ml-2">
          <div className="p-1.5 bg-primary rounded-lg">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">UniService</span>
        </Link>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">UniService</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="font-semibold text-primary">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.name}</p>
              <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full capitalize ${roleColor}`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

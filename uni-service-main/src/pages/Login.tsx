/**
 * Login Page - Uni Service Marketplace
 * 
 * User authentication page with email/password login.
 * Includes demo quick-login buttons for testing.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Users, Briefcase, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { UserRole } from '@/lib/types';

/**
 * Login page component with form validation
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, loginAsRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please enter both email and password.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password. Try the demo buttons below.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Quick demo login by role
  const handleDemoLogin = (role: UserRole) => {
    loginAsRole(role);
    toast({
      title: `Logged in as ${role}`,
      description: `You're now viewing the ${role} dashboard.`,
    });
    
    // Navigate to appropriate dashboard
    switch (role) {
      case 'student':
        navigate('/student');
        break;
      case 'provider':
        navigate('/provider');
        break;
      case 'admin':
        navigate('/admin');
        break;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 bg-primary-foreground/20 rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-primary-foreground">
            UniService
          </span>
        </Link>

        <div>
          <h1 className="text-4xl font-display font-bold text-primary-foreground mb-4">
            Welcome back to your campus community
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Log in to manage your service requests, track jobs, and connect with fellow students.
          </p>
        </div>

        <div className="text-primary-foreground/60 text-sm">
          © 2024 UniService Marketplace
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="p-2 bg-primary rounded-lg">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">UniService</span>
          </Link>

          <h2 className="text-2xl font-display font-bold mb-2">Sign in to your account</h2>
          <p className="text-muted-foreground mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Create one
            </Link>
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Quick Demo Access
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                variant="student"
                size="sm"
                onClick={() => handleDemoLogin('student')}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Users className="h-5 w-5" />
                <span className="text-xs">Student</span>
              </Button>
              <Button
                variant="provider"
                size="sm"
                onClick={() => handleDemoLogin('provider')}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Briefcase className="h-5 w-5" />
                <span className="text-xs">Provider</span>
              </Button>
              <Button
                variant="admin"
                size="sm"
                onClick={() => handleDemoLogin('admin')}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Shield className="h-5 w-5" />
                <span className="text-xs">Admin</span>
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">
              Click any role above to explore the demo
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

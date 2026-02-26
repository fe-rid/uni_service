/**
 * Auth Context - Uni Service Marketplace
 * 
 * Provides authentication state and methods throughout the application.
 * In production, this would integrate with Supabase Auth.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, UserRole, LoginFormData, RegisterFormData } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';

// ============= Context Types =============

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  loginAsRole: (role: UserRole) => void; // Demo function for easy testing
}

// ============= Context Creation =============

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============= Provider Component =============

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider wraps the application and provides authentication state.
 * Currently uses mock data for demonstration purposes.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Login with email and password
   * In production: validate against Supabase Auth
   */
  const login = useCallback(async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user by email (mock implementation)
      const foundUser = mockUsers.find(u => u.email === data.email);
      if (foundUser) {
        setUser(foundUser);
      } else {
        throw new Error('Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Register a new user
   * In production: create user in Supabase Auth and database
   */
  const register = useCallback(async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new user (mock implementation)
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: data.email,
        name: data.name,
        role: data.role,
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout the current user
   */
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  /**
   * Quick login as a specific role (for demo purposes)
   */
  const loginAsRole = useCallback((role: UserRole) => {
    const demoUser = mockUsers.find(u => u.role === role);
    if (demoUser) {
      setUser(demoUser);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loginAsRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============= Custom Hook =============

/**
 * Hook to access authentication context
 * Must be used within an AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

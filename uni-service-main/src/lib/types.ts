/**
 * Type Definitions - Uni Service Marketplace
 * 
 * Central type definitions for the entire application.
 * Includes user roles, service requests, reviews, and more.
 */

// ============= User Types =============

/**
 * User roles in the system
 * - student: Can post service requests and leave reviews
 * - provider: Can browse and accept service requests
 * - admin: Can manage all users and services
 */
export type UserRole = 'student' | 'provider' | 'admin';

/**
 * User profile information
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

/**
 * Auth context state
 */
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// ============= Service Request Types =============

/**
 * Status of a service request
 * - open: Available for providers to accept
 * - in_progress: A provider is working on it
 * - completed: Service has been delivered
 * - cancelled: Request was cancelled
 */
export type ServiceStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

/**
 * Categories of services available
 */
export type ServiceCategory = 
  | 'tutoring'
  | 'moving'
  | 'cleaning'
  | 'delivery'
  | 'tech_support'
  | 'design'
  | 'writing'
  | 'photography'
  | 'other';

/**
 * Service request posted by a student
 */
export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: ServiceCategory;
  status: ServiceStatus;
  studentId: string;
  studentName: string;
  providerId?: string;
  providerName?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// ============= Review Types =============

/**
 * Review left by a student for a completed service
 */
export interface Review {
  id: string;
  serviceId: string;
  studentId: string;
  studentName: string;
  providerId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

// ============= Dashboard Stats Types =============

/**
 * Statistics for admin dashboard
 */
export interface AdminStats {
  totalUsers: number;
  totalStudents: number;
  totalProviders: number;
  totalRequests: number;
  openRequests: number;
  completedRequests: number;
  totalRevenue: number;
}

/**
 * Statistics for student dashboard
 */
export interface StudentStats {
  totalRequests: number;
  openRequests: number;
  inProgressRequests: number;
  completedRequests: number;
  totalSpent: number;
}

/**
 * Statistics for provider dashboard
 */
export interface ProviderStats {
  totalJobsCompleted: number;
  activeJobs: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
}

// ============= Form Types =============

/**
 * Login form data
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Registration form data
 */
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

/**
 * Service request form data
 */
export interface ServiceRequestFormData {
  title: string;
  description: string;
  budget: number;
  category: ServiceCategory;
}

/**
 * Review form data
 */
export interface ReviewFormData {
  rating: number;
  comment: string;
}

// ============= Navigation Types =============

/**
 * Navigation item for sidebar/navbar
 */
export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavItem[];
}

/**
 * Mock Data - Uni Service Marketplace
 * 
 * Sample data for development and demonstration purposes.
 * In production, this data would come from the database.
 */

import type { User, ServiceRequest, Review, ServiceCategory } from './types';

// ============= Mock Users =============

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.student@university.edu',
    name: 'John Smith',
    role: 'student',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    email: 'sarah.provider@university.edu',
    name: 'Sarah Johnson',
    role: 'provider',
    createdAt: '2024-01-10T08:30:00Z',
  },
  {
    id: '3',
    email: 'admin@university.edu',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    email: 'emily.student@university.edu',
    name: 'Emily Chen',
    role: 'student',
    createdAt: '2024-02-01T14:20:00Z',
  },
  {
    id: '5',
    email: 'mike.provider@university.edu',
    name: 'Mike Williams',
    role: 'provider',
    createdAt: '2024-01-20T11:45:00Z',
  },
];

// ============= Mock Service Requests =============

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    title: 'Need help moving furniture to new dorm',
    description: 'Moving from Baker Hall to Wilson Hall. Have a couch, desk, and several boxes. Need help carrying items and loading into a truck.',
    budget: 50,
    category: 'moving',
    status: 'open',
    studentId: '1',
    studentName: 'John Smith',
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z',
  },
  {
    id: '2',
    title: 'Calculus II tutoring - 3 sessions',
    description: 'Struggling with integration techniques and series. Looking for someone who has taken Calc II recently and got an A.',
    budget: 75,
    category: 'tutoring',
    status: 'in_progress',
    studentId: '4',
    studentName: 'Emily Chen',
    providerId: '2',
    providerName: 'Sarah Johnson',
    createdAt: '2024-02-28T14:30:00Z',
    updatedAt: '2024-03-01T10:15:00Z',
  },
  {
    id: '3',
    title: 'Deep clean apartment before move-out',
    description: 'Need a thorough cleaning of my 2-bedroom apartment including kitchen, bathrooms, and floors. Must pass inspection.',
    budget: 100,
    category: 'cleaning',
    status: 'completed',
    studentId: '1',
    studentName: 'John Smith',
    providerId: '5',
    providerName: 'Mike Williams',
    createdAt: '2024-02-15T11:00:00Z',
    updatedAt: '2024-02-20T16:00:00Z',
    completedAt: '2024-02-20T16:00:00Z',
  },
  {
    id: '4',
    title: 'Website design for club event',
    description: 'Need a simple landing page for our engineering club annual hackathon. Should include registration form and event details.',
    budget: 150,
    category: 'design',
    status: 'open',
    studentId: '4',
    studentName: 'Emily Chen',
    createdAt: '2024-03-02T08:45:00Z',
    updatedAt: '2024-03-02T08:45:00Z',
  },
  {
    id: '5',
    title: 'Grocery delivery from Trader Joes',
    description: 'Need someone to pick up groceries from the TJs on Main St. Will provide list and payment for items plus delivery fee.',
    budget: 25,
    category: 'delivery',
    status: 'open',
    studentId: '1',
    studentName: 'John Smith',
    createdAt: '2024-03-02T12:00:00Z',
    updatedAt: '2024-03-02T12:00:00Z',
  },
  {
    id: '6',
    title: 'Fix laptop screen issue',
    description: 'MacBook Pro screen flickering randomly. Need someone with experience in Apple repairs to diagnose and fix.',
    budget: 80,
    category: 'tech_support',
    status: 'in_progress',
    studentId: '4',
    studentName: 'Emily Chen',
    providerId: '5',
    providerName: 'Mike Williams',
    createdAt: '2024-02-25T15:30:00Z',
    updatedAt: '2024-03-01T09:00:00Z',
  },
];

// ============= Mock Reviews =============

export const mockReviews: Review[] = [
  {
    id: '1',
    serviceId: '3',
    studentId: '1',
    studentName: 'John Smith',
    providerId: '5',
    rating: 5,
    comment: 'Mike did an amazing job cleaning my apartment! It was spotless and passed inspection with flying colors. Highly recommend!',
    createdAt: '2024-02-21T10:00:00Z',
  },
  {
    id: '2',
    serviceId: '7',
    studentId: '4',
    studentName: 'Emily Chen',
    providerId: '2',
    rating: 4,
    comment: 'Sarah is a great tutor. Very patient and explains concepts clearly. The only reason for 4 stars is scheduling was sometimes tricky.',
    createdAt: '2024-02-18T14:30:00Z',
  },
  {
    id: '3',
    serviceId: '8',
    studentId: '1',
    studentName: 'John Smith',
    providerId: '2',
    rating: 5,
    comment: 'Super helpful with my physics homework. Sarah really knows her stuff!',
    createdAt: '2024-02-10T16:45:00Z',
  },
];

// ============= Category Labels =============

export const categoryLabels: Record<ServiceCategory, string> = {
  tutoring: 'Tutoring',
  moving: 'Moving & Hauling',
  cleaning: 'Cleaning',
  delivery: 'Delivery',
  tech_support: 'Tech Support',
  design: 'Design',
  writing: 'Writing & Editing',
  photography: 'Photography',
  other: 'Other',
};

// ============= Category Icons (for reference) =============

export const categoryIcons: Record<ServiceCategory, string> = {
  tutoring: 'GraduationCap',
  moving: 'Truck',
  cleaning: 'Sparkles',
  delivery: 'Package',
  tech_support: 'Monitor',
  design: 'Palette',
  writing: 'PenTool',
  photography: 'Camera',
  other: 'MoreHorizontal',
};

// ============= Status Labels =============

export const statusLabels: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

// ============= Status Colors (using Tailwind classes) =============

export const statusColors: Record<string, string> = {
  open: 'bg-info/10 text-info border-info/20',
  in_progress: 'bg-warning/10 text-warning border-warning/20',
  completed: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

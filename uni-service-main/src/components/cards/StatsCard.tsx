/**
 * Stats Card Component - Uni Service Marketplace
 * 
 * Displays a single statistic in a card format.
 * Used in dashboards to show key metrics.
 */

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

// ============= Component Props =============

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  variant?: 'default' | 'student' | 'provider' | 'admin' | 'success' | 'warning';
}

const variantStyles = {
  default: 'bg-primary/10 text-primary',
  student: 'bg-student/10 text-student',
  provider: 'bg-provider/10 text-provider',
  admin: 'bg-admin/10 text-admin',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
};

/**
 * Card component for displaying a single statistic
 */
export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  variant = 'default',
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold font-display">
            {typeof value === 'number' && title.toLowerCase().includes('earning') 
              ? `$${value.toLocaleString()}` 
              : value.toLocaleString()
            }
          </p>
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={`text-sm font-medium ${
                trend.isPositive ? 'text-success' : 'text-destructive'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          )}
          
          {description && (
            <p className="text-sm text-muted-foreground mt-2">
              {description}
            </p>
          )}
        </div>
        
        <div className={`p-3 rounded-xl ${variantStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}

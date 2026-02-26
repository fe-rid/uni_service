/**
 * Service Card Component - Uni Service Marketplace
 * 
 * Displays a service request in a card format.
 * Used in browse pages and dashboards.
 */

import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Truck, 
  Sparkles, 
  Package, 
  Monitor, 
  Palette,
  PenTool,
  Camera,
  MoreHorizontal,
  Clock,
  DollarSign,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ServiceRequest, ServiceCategory } from '@/lib/types';
import { categoryLabels, statusLabels, statusColors } from '@/lib/mock-data';

// ============= Category Icons =============

const categoryIconMap: Record<ServiceCategory, React.ComponentType<{ className?: string }>> = {
  tutoring: GraduationCap,
  moving: Truck,
  cleaning: Sparkles,
  delivery: Package,
  tech_support: Monitor,
  design: Palette,
  writing: PenTool,
  photography: Camera,
  other: MoreHorizontal,
};

// ============= Component Props =============

interface ServiceCardProps {
  service: ServiceRequest;
  onAccept?: (id: string) => void;
  onComplete?: (id: string) => void;
  onView?: (id: string) => void;
  showActions?: boolean;
  variant?: 'default' | 'compact';
}

/**
 * Card component for displaying service request information
 */
export function ServiceCard({
  service,
  onAccept,
  onComplete,
  onView,
  showActions = true,
  variant = 'default',
}: ServiceCardProps) {
  const CategoryIcon = categoryIconMap[service.category] || MoreHorizontal;
  const formattedDate = new Date(service.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-lg">
            <CategoryIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <Badge 
              variant="outline" 
              className={`text-xs ${statusColors[service.status]}`}
            >
              {statusLabels[service.status]}
            </Badge>
          </div>
        </div>
        <span className="text-lg font-bold text-primary">
          ${service.budget}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
        {service.title}
      </h3>
      {variant === 'default' && (
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {service.description}
        </p>
      )}

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{service.studentName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        <Badge variant="secondary" className="text-xs">
          {categoryLabels[service.category]}
        </Badge>
      </div>

      {/* Provider Info (if assigned) */}
      {service.providerId && service.providerName && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-2 bg-secondary rounded-lg">
          <span className="font-medium">Assigned to:</span>
          <span>{service.providerName}</span>
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          {onView && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onView(service.id)}
              className="flex-1"
            >
              View Details
            </Button>
          )}
          
          {service.status === 'open' && onAccept && (
            <Button 
              variant="provider" 
              size="sm" 
              onClick={() => onAccept(service.id)}
              className="flex-1"
            >
              Accept Job
            </Button>
          )}
          
          {service.status === 'in_progress' && onComplete && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => onComplete(service.id)}
              className="flex-1"
            >
              Mark Complete
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}

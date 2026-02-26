/**
 * Review Card Component - Uni Service Marketplace
 * 
 * Displays a review with rating and comment.
 */

import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import type { Review } from '@/lib/types';

// ============= Component Props =============

interface ReviewCardProps {
  review: Review;
}

/**
 * Renders star rating based on a number 1-5
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating 
              ? 'fill-accent text-accent' 
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Card component for displaying a review
 */
export function ReviewCard({ review }: ReviewCardProps) {
  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-5 shadow-card"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{review.studentName}</p>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Comment */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        {review.comment}
      </p>
    </motion.div>
  );
}

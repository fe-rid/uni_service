/**
 * Provider Dashboard - Uni Service Marketplace
 * 
 * Dashboard for service providers to manage jobs.
 */

import { motion } from 'framer-motion';
import { 
  Briefcase, 
  DollarSign, 
  Star, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/cards/StatsCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockServiceRequests, mockReviews } from '@/lib/mock-data';

/**
 * Provider dashboard with job management
 */
export default function ProviderDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Get provider's data
  const myJobs = mockServiceRequests.filter(r => r.providerId === user?.id || r.providerName === user?.name);
  const availableJobs = mockServiceRequests.filter(r => r.status === 'open');
  const myReviews = mockReviews.filter(r => r.providerId === user?.id);

  // Calculate stats
  const completedJobs = myJobs.filter(r => r.status === 'completed');
  const activeJobs = myJobs.filter(r => r.status === 'in_progress');
  const totalEarnings = completedJobs.reduce((sum, r) => sum + r.budget, 0);
  const avgRating = myReviews.length > 0 
    ? myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length 
    : 0;

  // Handle accepting a job
  const handleAcceptJob = (id: string) => {
    toast({
      title: 'Job accepted!',
      description: 'You have been assigned to this service request.',
    });
  };

  // Handle completing a job
  const handleCompleteJob = (id: string) => {
    toast({
      title: 'Job marked complete!',
      description: 'The student will be notified to leave a review.',
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold">
          Provider Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your jobs and earnings.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Earnings"
          value={`$${totalEarnings}`}
          icon={DollarSign}
          variant="success"
        />
        <StatsCard
          title="Jobs Completed"
          value={completedJobs.length}
          icon={CheckCircle}
          variant="provider"
        />
        <StatsCard
          title="Active Jobs"
          value={activeJobs.length}
          icon={Clock}
          variant="warning"
        />
        <StatsCard
          title="Average Rating"
          value={avgRating.toFixed(1)}
          icon={Star}
          variant="default"
          description={`${myReviews.length} reviews`}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="available" className="space-y-6">
        <TabsList>
          <TabsTrigger value="available">
            Available Jobs ({availableJobs.length})
          </TabsTrigger>
          <TabsTrigger value="my-jobs">
            My Jobs ({myJobs.length})
          </TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({myReviews.length})
          </TabsTrigger>
        </TabsList>

        {/* Available Jobs */}
        <TabsContent value="available">
          {availableJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableJobs.map((job) => (
                <ServiceCard
                  key={job.id}
                  service={job}
                  onAccept={handleAcceptJob}
                  onView={(id) => console.log('View:', id)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-card rounded-xl border border-border"
            >
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No available jobs</h3>
              <p className="text-muted-foreground">
                Check back soon for new opportunities.
              </p>
            </motion.div>
          )}
        </TabsContent>

        {/* My Jobs */}
        <TabsContent value="my-jobs">
          {myJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myJobs.map((job) => (
                <ServiceCard
                  key={job.id}
                  service={job}
                  onComplete={job.status === 'in_progress' ? handleCompleteJob : undefined}
                  onView={(id) => console.log('View:', id)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-card rounded-xl border border-border"
            >
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs yet</h3>
              <p className="text-muted-foreground">
                Accept a job from the available listings to get started.
              </p>
            </motion.div>
          )}
        </TabsContent>

        {/* Reviews */}
        <TabsContent value="reviews">
          {myReviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {myReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-card rounded-xl border border-border"
            >
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
              <p className="text-muted-foreground">
                Complete jobs to receive reviews from students.
              </p>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

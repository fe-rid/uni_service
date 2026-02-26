/**
 * Student Dashboard - Uni Service Marketplace
 * 
 * Main dashboard for student users to manage their service requests.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  FileText, 
  Clock, 
  CheckCircle, 
  DollarSign,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/cards/StatsCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockServiceRequests, categoryLabels } from '@/lib/mock-data';
import type { ServiceCategory, ServiceRequest } from '@/lib/types';

/**
 * Student dashboard with stats and request management
 */
export default function StudentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    category: '' as ServiceCategory | ''
  });

  // Get student's requests (mock)
  const myRequests = mockServiceRequests.filter(r => r.studentId === user?.id || r.studentName === user?.name);
  
  // Calculate stats
  const stats = {
    total: myRequests.length,
    open: myRequests.filter(r => r.status === 'open').length,
    inProgress: myRequests.filter(r => r.status === 'in_progress').length,
    completed: myRequests.filter(r => r.status === 'completed').length,
    totalSpent: myRequests.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.budget, 0)
  };

  // Handle new request submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.budget || !formData.category) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    // In production, this would call an API
    toast({
      title: 'Request created!',
      description: 'Your service request has been posted.',
    });
    
    setFormData({ title: '', description: '', budget: '', category: '' });
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Manage your service requests and find help.
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="student" className="gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Service Request</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="What do you need help with?"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as ServiceCategory })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="50"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you need in detail..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="student">
                  Post Request
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Requests"
          value={stats.total}
          icon={FileText}
          variant="student"
        />
        <StatsCard
          title="Open"
          value={stats.open}
          icon={Clock}
          variant="default"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
          variant="warning"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          variant="success"
        />
      </div>

      {/* Recent Requests */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Requests</h2>
        
        {myRequests.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myRequests.map((request) => (
              <ServiceCard
                key={request.id}
                service={request}
                onView={(id) => console.log('View:', id)}
                showActions={false}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-card rounded-xl border border-border"
          >
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No requests yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first service request to get started.
            </p>
            <Button variant="student" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Request
            </Button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}

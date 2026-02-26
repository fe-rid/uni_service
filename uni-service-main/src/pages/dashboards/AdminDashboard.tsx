/**
 * Admin Dashboard - Uni Service Marketplace
 * 
 * Admin panel for managing users and services.
 */

import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  UserCheck,
  Briefcase,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/cards/StatsCard';
import { mockUsers, mockServiceRequests, statusLabels, statusColors } from '@/lib/mock-data';

/**
 * Admin dashboard with overview and management tools
 */
export default function AdminDashboard() {
  // Calculate stats
  const totalUsers = mockUsers.length;
  const totalStudents = mockUsers.filter(u => u.role === 'student').length;
  const totalProviders = mockUsers.filter(u => u.role === 'provider').length;
  const totalRequests = mockServiceRequests.length;
  const completedRequests = mockServiceRequests.filter(r => r.status === 'completed').length;
  const totalRevenue = mockServiceRequests
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + r.budget, 0);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'student': return 'bg-student/10 text-student border-student/20';
      case 'provider': return 'bg-provider/10 text-provider border-provider/20';
      case 'admin': return 'bg-admin/10 text-admin border-admin/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-admin/10 rounded-lg">
            <Shield className="h-6 w-6 text-admin" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">
            Admin Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground">
          Overview of platform activity and management tools.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          variant="admin"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Requests"
          value={totalRequests}
          icon={FileText}
          variant="default"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Completed"
          value={completedRequests}
          icon={TrendingUp}
          variant="success"
        />
        <StatsCard
          title="Platform Revenue"
          value={`$${totalRevenue}`}
          icon={DollarSign}
          variant="warning"
          description="10% commission"
        />
      </div>

      {/* User/Role Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-student/10 rounded-lg">
              <UserCheck className="h-5 w-5 text-student" />
            </div>
            <span className="font-medium">Students</span>
          </div>
          <p className="text-3xl font-display font-bold">{totalStudents}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-provider/10 rounded-lg">
              <Briefcase className="h-5 w-5 text-provider" />
            </div>
            <span className="font-medium">Providers</span>
          </div>
          <p className="text-3xl font-display font-bold">{totalProviders}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <span className="font-medium">Completion Rate</span>
          </div>
          <p className="text-3xl font-display font-bold">
            {totalRequests > 0 ? Math.round((completedRequests / totalRequests) * 100) : 0}%
          </p>
        </motion.div>
      </div>

      {/* Data Tables */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        {/* Users Table */}
        <TabsContent value="users">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`capitalize ${getRoleBadgeVariant(user.role)}`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Services Table */}
        <TabsContent value="services">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockServiceRequests.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {service.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {service.studentName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {service.providerName || '-'}
                    </TableCell>
                    <TableCell className="font-medium">${service.budget}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[service.status]}>
                        {statusLabels[service.status]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

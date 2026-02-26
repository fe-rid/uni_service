/**
 * About Page - Uni Service Marketplace
 * 
 * Information about the platform and how it works.
 */

import { motion } from 'framer-motion';
import { GraduationCap, Heart, Shield, Users, Target, Lightbulb } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const values = [
  {
    icon: Users,
    title: 'Community First',
    description: 'We believe in the power of students helping students. Our platform fosters a supportive campus community.'
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'All users are verified university students. We prioritize your safety and peace of mind.'
  },
  {
    icon: Heart,
    title: 'Affordable Access',
    description: 'Student-friendly pricing that respects tight budgets while fairly compensating providers.'
  },
  {
    icon: Lightbulb,
    title: 'Skill Development',
    description: 'Providers gain real-world experience and build portfolios while earning income.'
  }
];

const team = [
  { name: 'Alex Chen', role: 'Founder & CEO', emoji: '👨‍💻' },
  { name: 'Sarah Johnson', role: 'Head of Operations', emoji: '👩‍💼' },
  { name: 'Mike Williams', role: 'Lead Developer', emoji: '👨‍🔧' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              <span>Our Story</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Built by Students,
              <span className="gradient-text block">For Students</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              UniService was born from a simple idea: university students have skills to share and 
              needs to fill. We created a platform that connects them, building a stronger campus community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <Target className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-3xl font-display font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To create a trusted peer-to-peer marketplace where university students can 
                  easily find affordable help with everyday tasks while giving fellow students 
                  opportunities to earn income and build skills.
                </p>
              </div>
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="font-semibold text-lg mb-4">By the Numbers</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-3xl font-display font-bold text-primary">1,000+</p>
                    <p className="text-sm text-muted-foreground">Active Students</p>
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold text-primary">500+</p>
                    <p className="text-sm text-muted-foreground">Services Completed</p>
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold text-primary">4.9</p>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold text-primary">$25k+</p>
                    <p className="text-sm text-muted-foreground">Earned by Providers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by these core principles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 border border-border text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold mb-4">Meet the Team</h2>
            <p className="text-muted-foreground">
              Current and former students passionate about campus community.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {member.emoji}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

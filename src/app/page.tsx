"use client";

import { motion } from "framer-motion";
import { Heart, Users, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                <span>Empowering Charitable Giving</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Make a Difference with{" "}
              <span className="text-primary">Every Donation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10"
            >
              A modern platform for charities to manage donations, campaigns,
              and events. Connect with donors and maximize your impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/signup"
                className="group flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 border border-border hover:border-primary text-foreground font-medium rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Why Choose Us?
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                Everything you need to run successful fundraising campaigns
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "For Organizations",
                  description:
                    "Create and manage campaigns, track donations, and engage with your donors effectively.",
                },
                {
                  icon: Users,
                  title: "For Donors",
                  description:
                    "Discover causes you care about and make secure donations with complete transparency.",
                },
                {
                  icon: Shield,
                  title: "Secure & Reliable",
                  description:
                    "Bank-level security for all transactions. Your data is protected at all times.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center p-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Join thousands of organizations making a difference. Create your
              account today.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              Create Your Organization
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">DonationPlatform</span>
            </div>
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} DonationPlatform. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

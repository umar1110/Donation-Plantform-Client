"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sun, Moon } from "lucide-react";
import { useTheme } from "@/src/providers";
import { useAuthStore } from "../stores/auth.store";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { accessToken } = useAuthStore();
  const isLoggedIn = accessToken != null;
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg text-foreground">
              DonationPlatform
            </span>
          </Link>

          {/* Auth Links & Theme Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-border/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <Link
              href="/receipts"
              className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Receipts
            </Link>
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

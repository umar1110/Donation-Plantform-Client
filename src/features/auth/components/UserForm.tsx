"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { UserFormProps } from "../types";

export function UserForm({
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  onBack,
  onChange,
  onSubmit,
  onTogglePassword,
  onToggleConfirmPassword,
}: UserFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-foreground">
          Create Your Account
        </h2>
        <p className="text-sm text-muted">Join as an individual donor</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={onChange}
              placeholder="John"
              className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors ${
                errors.first_name
                  ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                  : "border-border focus:ring-primary/50 focus:border-primary"
              }`}
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={onChange}
              placeholder="Doe"
              className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors ${
                errors.last_name
                  ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                  : "border-border focus:ring-primary/50 focus:border-primary"
              }`}
            />
            {errors.last_name && (
              <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="you@example.com"
              className={`w-full pl-11 pr-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors ${
                errors.email
                  ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                  : "border-border focus:ring-primary/50 focus:border-primary"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Min. 6 characters"
              className={`w-full pl-11 pr-12 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors ${
                errors.password
                  ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                  : "border-border focus:ring-primary/50 focus:border-primary"
              }`}
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={onChange}
              placeholder="Confirm your password"
              className={`w-full pl-11 pr-12 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors ${
                errors.confirm_password
                  ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                  : "border-border focus:ring-primary/50 focus:border-primary"
              }`}
            />
            <button
              type="button"
              onClick={onToggleConfirmPassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirm_password && (
            <p className="mt-1 text-sm text-red-500">{errors.confirm_password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
        >
          Create Account
        </button>
      </form>
    </motion.div>
  );
}

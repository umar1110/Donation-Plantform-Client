"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Globe,
  Mail,
  Lock,
  Check,
  Loader2,
} from "lucide-react";
import {
  OrganizationFormProps,
  Step1FormProps,
  Step2FormProps,
  ORGANIZATION_TYPES,
  COUNTRIES,
} from "../types";

export function OrganizationForm({
  formData,
  step,
  step1Errors,
  step2Errors,
  websiteError,
  showPassword,
  showConfirmPassword,
  isLoading,
  apiError,
  onBack,
  onChange,
  onContinue,
  onSubmit,
  onSetStep,
  onTogglePassword,
  onToggleConfirmPassword,
}: OrganizationFormProps) {
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

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                s === step
                  ? "bg-primary text-white"
                  : s < step
                  ? "bg-primary/20 text-primary"
                  : "bg-border text-muted"
              }`}
            >
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 2 && (
              <div
                className={`w-12 h-1 rounded ${
                  s < step ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <Step1Form
              formData={formData}
              errors={step1Errors}
              websiteError={websiteError}
              onChange={onChange}
              onContinue={onContinue}
            />
          )}

          {step === 2 && (
            <Step2Form
              formData={formData}
              errors={step2Errors}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              isLoading={isLoading}
              apiError={apiError}
              onChange={onChange}
              onBack={() => onSetStep(1)}
              onTogglePassword={onTogglePassword}
              onToggleConfirmPassword={onToggleConfirmPassword}
            />
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}

function Step1Form({
  formData,
  errors,
  websiteError,
  onChange,
  onContinue,
}: Step1FormProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Organization Details
        </h2>
        <p className="text-sm text-muted">Tell us about your organization</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Organization Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="e.g., Hope Foundation"
          className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors ${
            errors.name
              ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
              : "border-border focus:ring-primary/50 focus:border-primary"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Subdomain *
        </label>
        <div className="flex items-center">
          <input
            type="text"
            name="subdomain"
            value={formData.subdomain}
            onChange={onChange}
            placeholder="your-org"
            className={`flex-1 px-4 py-3 rounded-l-lg border border-r-0 bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors ${
              errors.subdomain
                ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                : "border-border focus:ring-primary/50 focus:border-primary"
            }`}
          />
          <span
            className={`px-4 py-3 bg-border/50 border rounded-r-lg text-muted text-sm ${
              errors.subdomain ? "border-red-500" : "border-border"
            }`}
          >
            .donationplatform.com
          </span>
        </div>
        {errors.subdomain && (
          <p className="mt-1 text-sm text-red-500">{errors.subdomain}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Briefly describe your organization and mission..."
          rows={3}
          className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors resize-none ${
            errors.description
              ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
              : "border-border focus:ring-primary/50 focus:border-primary"
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Type *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={onChange}
            className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 transition-colors ${
              errors.type
                ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                : "border-border focus:ring-primary/50 focus:border-primary"
            }`}
          >
            <option value="">Select type</option>
            {ORGANIZATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-500">{errors.type}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Country *
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={onChange}
            className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 transition-colors ${
              errors.country
                ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                : "border-border focus:ring-primary/50 focus:border-primary"
            }`}
          >
            <option value="">Select country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-500">{errors.country}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Address *
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Enter your organization's full address..."
          rows={2}
          className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors resize-none ${
            errors.address
              ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
              : "border-border focus:ring-primary/50 focus:border-primary"
          }`}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-500">{errors.address}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Website
        </label>
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={onChange}
            placeholder="https://yourwebsite.com"
            className={`w-full pl-11 pr-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors ${
              websiteError
                ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                : "border-border focus:ring-primary/50 focus:border-primary"
            }`}
          />
        </div>
        {websiteError && (
          <p className="mt-1 text-sm text-red-500">{websiteError}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          ABN (Australian Business Number)
        </label>
        <input
          type="text"
          name="ABN"
          value={formData.ABN}
          onChange={onChange}
          placeholder="XX XXX XXX XXX"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        />
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

function Step2Form({
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  isLoading,
  apiError,
  onChange,
  onBack,
  onTogglePassword,
  onToggleConfirmPassword,
}: Step2FormProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Admin Account</h2>
        <p className="text-sm text-muted">Create your administrator account</p>
      </div>

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
            name="user_email"
            value={formData.user_email}
            onChange={onChange}
            placeholder="admin@organization.com"
            className={`w-full pl-11 pr-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors ${
              errors.user_email
                ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                : "border-border focus:ring-primary/50 focus:border-primary"
            }`}
          />
        </div>
        {errors.user_email && (
          <p className="mt-1 text-sm text-red-500">{errors.user_email}</p>
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
            name="user_password"
            value={formData.user_password}
            onChange={onChange}
            placeholder="Min. 6 characters"
            className={`w-full pl-11 pr-12 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 transition-colors ${
              errors.user_password
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
        {errors.user_password && (
          <p className="mt-1 text-sm text-red-500">{errors.user_password}</p>
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

      {/* API Error */}
      {apiError && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-500">{apiError}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 py-3 border border-border hover:border-primary text-foreground font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Organization"
          )}
        </button>
      </div>
    </motion.div>
  );
}

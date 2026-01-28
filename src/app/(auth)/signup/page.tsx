"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import {
  TypeSelection,
  OrganizationForm,
  UserForm,
  useSignupForm,
} from "@/src/features/auth";

export default function SignupPage() {
  const {
    signupType,
    step,
    showPassword,
    showConfirmPassword,
    websiteError,
    step1Errors,
    step2Errors,
    userFormErrors,
    orgFormData,
    userFormData,
    apiError,
    isLoading,
    setSignupType,
    setStep,
    setShowPassword,
    setShowConfirmPassword,
    handleOrgChange,
    handleUserChange,
    handleContinueToStep2,
    handleOrgSubmit,
    handleUserSubmit,
  } = useSignupForm();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary to-primary-dark p-12 flex-col justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-white/10">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="font-semibold text-xl text-white">
            DonationPlatform
          </span>
        </Link>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Start making a difference today
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/80"
          >
            Join thousands of organizations and donors working together to
            create positive change in the world.
          </motion.p>
        </div>

        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} DonationPlatform. All rights reserved.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link
            href="/"
            className="lg:hidden flex items-center justify-center gap-2 mb-8"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg text-foreground">
              DonationPlatform
            </span>
          </Link>

          <AnimatePresence mode="wait">
            {signupType === null && (
              <TypeSelection onSelect={setSignupType} />
            )}
            
            {signupType === "organization" && (
              <OrganizationForm
                formData={orgFormData}
                step={step}
                step1Errors={step1Errors}
                step2Errors={step2Errors}
                websiteError={websiteError}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                isLoading={isLoading}
                apiError={apiError}
                onBack={() => setSignupType(null)}
                onChange={handleOrgChange}
                onContinue={handleContinueToStep2}
                onSubmit={handleOrgSubmit}
                onSetStep={setStep}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
            
            {signupType === "user" && (
              <UserForm
                formData={userFormData}
                errors={userFormErrors}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                onBack={() => setSignupType(null)}
                onChange={handleUserChange}
                onSubmit={handleUserSubmit}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </AnimatePresence>

          <p className="text-center text-sm text-muted mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary-dark font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

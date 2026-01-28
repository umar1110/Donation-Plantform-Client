"use client";

import { useState } from "react";
import {
  OrgFormData,
  UserFormData,
  Step1Errors,
  Step2Errors,
  UserFormErrors,
  SignupType,
} from "../types";

const isValidUrl = (url: string): boolean => {
  if (!url) return true;
  const urlPattern =
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  return urlPattern.test(url);
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function useSignupForm() {
  const [signupType, setSignupType] = useState<SignupType>(null);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [websiteError, setWebsiteError] = useState<string | null>(null);
  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({});
  const [userFormErrors, setUserFormErrors] = useState<UserFormErrors>({});

  const [orgFormData, setOrgFormData] = useState<OrgFormData>({
    name: "",
    subdomain: "",
    description: "",
    website: "",
    ABN: "",
    type: "",
    country: "",
    first_name: "",
    last_name: "",
    user_email: "",
    user_password: "",
    confirm_password: "",
  });

  const [userFormData, setUserFormData] = useState<UserFormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const validateStep1 = (): boolean => {
    const errors: Step1Errors = {};

    if (!orgFormData.name.trim()) {
      errors.name = "Organization name is required";
    }
    if (!orgFormData.subdomain.trim()) {
      errors.subdomain = "Subdomain is required";
    }
    if (!orgFormData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!orgFormData.type) {
      errors.type = "Organization type is required";
    }
    if (!orgFormData.country) {
      errors.country = "Country is required";
    }

    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: Step2Errors = {};

    if (!orgFormData.first_name.trim()) {
      errors.first_name = "First name is required";
    }
    if (!orgFormData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }
    if (!orgFormData.user_email.trim()) {
      errors.user_email = "Email is required";
    } else if (!isValidEmail(orgFormData.user_email)) {
      errors.user_email = "Please enter a valid email address";
    }
    if (!orgFormData.user_password) {
      errors.user_password = "Password is required";
    } else if (orgFormData.user_password.length < 6) {
      errors.user_password = "Password must be at least 6 characters";
    }
    if (!orgFormData.confirm_password) {
      errors.confirm_password = "Please confirm your password";
    } else if (orgFormData.user_password !== orgFormData.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    setStep2Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateUserForm = (): boolean => {
    const errors: UserFormErrors = {};

    if (!userFormData.first_name.trim()) {
      errors.first_name = "First name is required";
    }
    if (!userFormData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }
    if (!userFormData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(userFormData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!userFormData.password) {
      errors.password = "Password is required";
    } else if (userFormData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!userFormData.confirm_password) {
      errors.confirm_password = "Please confirm your password";
    } else if (userFormData.password !== userFormData.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    setUserFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToStep2 = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleOrgChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setOrgFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (step1Errors[name as keyof Step1Errors]) {
      setStep1Errors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (step2Errors[name as keyof Step2Errors]) {
      setStep2Errors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Validate website URL
    if (name === "website") {
      if (value && !isValidUrl(value)) {
        setWebsiteError("Please enter a valid URL (e.g., https://example.com)");
      } else {
        setWebsiteError(null);
      }
    }

    // Auto-generate subdomain from name
    if (name === "name") {
      const subdomain = value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setOrgFormData((prev) => ({ ...prev, subdomain }));
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (userFormErrors[name as keyof UserFormErrors]) {
      setUserFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) {
      return;
    }
    // Will handle API call in next step
    console.log("Organization signup:", orgFormData);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUserForm()) {
      return;
    }
    // Will handle API call in next step
    console.log("User signup:", userFormData);
  };

  const resetForm = () => {
    setSignupType(null);
    setStep(1);
    setStep1Errors({});
    setStep2Errors({});
    setUserFormErrors({});
    setWebsiteError(null);
  };

  return {
    // State
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

    // Setters
    setSignupType,
    setStep,
    setShowPassword,
    setShowConfirmPassword,

    // Handlers
    handleOrgChange,
    handleUserChange,
    handleContinueToStep2,
    handleOrgSubmit,
    handleUserSubmit,
    resetForm,
  };
}

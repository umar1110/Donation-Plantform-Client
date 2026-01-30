export type SignupType = "organization" | "user" | null;

// API Request Types (matches backend schema)
export interface RegisterOrgData {
  // Organization fields
  name: string;
  subdomain: string;
  description: string;
  website?: string | null;
  ABN?: string | null;
  type?: string | null;
  country: string;
  address: string;
  // Owner fields
  first_name: string;
  last_name: string;
  user_email: string;
  user_password: string;
}

// Form Data Types (includes confirm_password for validation)
export interface OrgFormData {
  // Organization fields
  name: string;
  subdomain: string;
  description: string;
  website: string;
  ABN: string;
  type: string;
  country: string;
  address: string;
  // Owner fields
  first_name: string;
  last_name: string;
  user_email: string;
  user_password: string;
  confirm_password: string;
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface Step1Errors {
  name?: string;
  subdomain?: string;
  description?: string;
  type?: string;
  country?: string;
  address?: string;
}

export interface Step2Errors {
  first_name?: string;
  last_name?: string;
  user_email?: string;
  user_password?: string;
  confirm_password?: string;
}

export interface UserFormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

export const ORGANIZATION_TYPES = [
  "Charity",
  "Non-Profit",
  "Foundation",
  "Religious Organization",
  "Educational Institution",
  "Healthcare",
  "Community Service",
  "Other",
] as const;

export const COUNTRIES = [
  "Australia",
  "United States",
  "United Kingdom",
  "Canada",
  "Pakistan",
  "India",
  "Other",
] as const;

// Component Props Interfaces
export interface OrganizationFormProps {
  formData: OrgFormData;
  step: number;
  step1Errors: Step1Errors;
  step2Errors: Step2Errors;
  websiteError: string | null;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoading?: boolean;
  apiError?: string | null;
  onBack: () => void;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onContinue: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onSetStep: (step: number) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
}

export interface Step1FormProps {
  formData: OrgFormData;
  errors: Step1Errors;
  websiteError: string | null;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onContinue: () => void;
}

export interface Step2FormProps {
  formData: OrgFormData;
  errors: Step2Errors;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoading?: boolean;
  apiError?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
}

export interface UserFormProps {
  formData: UserFormData;
  errors: UserFormErrors;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onBack: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
}

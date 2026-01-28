export interface User {
  id: string;
  auth_user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_organization_admin: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// ----------------------
// ADMIN PROFILE INTERFACE

import { UserStatus } from "./event.interface";

// ----------------------
export interface IAdmin {
  id: string;
  email: string;
  name: string;
  profilePhoto?: string | null;

  phoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;

  canManageUsers: boolean;
  canManageHosts: boolean;
  canManageEvents: boolean;
  canManagePayments: boolean;
  canVerifyHosts: boolean;
  canSuspendAccounts: boolean;

  lastLoginAt?: string | null;
  lastActiveAt?: string | null;
  loginCount?: number | null;

  adminNotes?: string | null;
  status: UserStatus;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
}

// ----------------------
// HOST PROFILE INTERFACE

import { UserStatus, VerificationStatus } from "./event.interface";

// ----------------------
export interface IHost {
  id: string;
  email: string;
  name: string;

  profilePhoto?: string | null;
  contactNumber?: string | null;
  bio?: string | null;
  experience?: string | null;
  specialties?: string | null;

  rating?: number | null;
  reviewCount?: number | null;

  websiteUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;

  city?: string | null;
  country?: string | null;
  address?: string | null;

  isVerified: boolean;
  identityDocument?: string | null;
  verificationStatus: VerificationStatus;
  rejectionReason?: string | null;

  preferredCommunication: string;

  payoutMethod?: string | null;
  payoutAccount?: string | null;

  maxEventLimit?: number | null;
  totalEventsHosted?: number | null;
  totalParticipants?: number | null;
  totalEarnings?: number | null;

  lastActiveAt?: string | null;

  isDeleted: boolean;
  status: UserStatus;

  createdAt: string;
  updatedAt: string;
}

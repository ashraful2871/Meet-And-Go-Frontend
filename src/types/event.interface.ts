export interface IEvents {
  id: string;
  hostId: string;
  userId: string;
  name: string;
  type: string;
  categoryId: string;
  description: string | null;
  image: string | null;
  eventBookingDeadline: string | null; // ISO string
  date: string; // ISO
  time: string | null;
  location: string | null;
  city: string | null;
  country: string | null;
  minParticipants: number;
  maxParticipants: number;
  joiningFee: number;
  status: string;
  createdAt: string;
  updatedAt: string;

  eventCategory: EventCategory;

  host: HostResponse;

  reviews: ReviewResponse[];
}

// ⭐ Event Status Enum
export type EventStatus = "OPEN" | "FULL" | "CANCELLED" | "COMPLETED";

// ⭐ Event Category
export interface EventCategory {
  id: string;
  name: string;
}

// ⭐ Host Response Type
export interface HostResponse {
  id: string;
  userId: string;
  email: string;
  profilePhoto: string | null;
  name: string;
  contactNumber: string | null;

  bio: string | null;
  experience: string | null;
  specialties: string | null;

  rating: number;
  reviewCount: number;

  websiteUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;

  city: string | null;
  country: string | null;
  address: string | null;

  isVerified: boolean;
  identityDocument: string | null;
  verificationStatus: VerificationStatus;
  rejectionReason?: string | null;

  preferredCommunication: HostContactPreference;
  payoutMethod: string | null;
  payoutAccount: string | null;
  maxEventLimit: number;

  totalEventsHosted: number;
  totalParticipants: number;
  totalEarnings: number;

  lastActiveAt: string | null;

  isDeleted: boolean;
  status: UserStatus;

  createdAt: string;
  updatedAt: string;
}

// ⭐ Verification Status Enum
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

// ⭐ Host Contact Preference Enum
export type HostContactPreference = "EMAIL" | "PHONE" | "WHATSAPP";

// ⭐ User Status Enum
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

// ⭐ Review Response
export interface ReviewResponse {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string;
    profilePicture: string | null;
  };
}

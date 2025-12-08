import { UserRole } from "@/service/auth/auth-utils";
import { IAdmin } from "./admin.interface";
import { IHost } from "./host.interface";
import { UserStatus } from "./event.interface";

export interface UserInfo {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  status: UserStatus;
  needPasswordChange: boolean;
  phoneNumber?: string | null;
  address?: string | null;
  profilePicture?: string | null;
  bio?: string | null;
  dateOfBirth?: string | null;
  gender?: "MALE" | "FEMALE";
  hobbies: string[];
  interests: string[];
  IsVerified: boolean;
  createdAt: string;
  updatedAt: string;

  admin?: IAdmin | null;
  host?: IHost | null;
}

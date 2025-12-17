"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Edit,
  Settings,
  Shield,
  Star,
  Award,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Users,
  FileText,
  Briefcase,
} from "lucide-react";
import { UserInfo } from "@/types/user.interface";

interface ProfileContentProps {
  user: UserInfo;
}

const ProfileContent = ({ user }: ProfileContentProps) => {
  console.log(user, " from ProfileContent");

  // Handle case when user data is not available
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            No user data available
          </p>
        </div>
      </div>
    );
  }

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Not available";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get role badge color
  const getRoleBadge = (role: string) => {
    const roleConfig = {
      USER: { label: "User", color: "bg-blue-100 text-blue-700" },
      HOST: { label: "Host", color: "bg-purple-100 text-purple-700" },
      ADMIN: { label: "Admin", color: "bg-red-100 text-red-700" },
    };
    return roleConfig[role as keyof typeof roleConfig] || roleConfig.USER;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    return status === "ACTIVE"
      ? { label: "Active", color: "bg-green-100 text-green-700" }
      : { label: "Inactive", color: "bg-gray-100 text-gray-700" };
  };

  const roleBadge = getRoleBadge(user.role);
  const statusBadge = getStatusBadge(user.status);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              {/* Avatar */}
              <Avatar className="h-24 w-24 border-4 border-background shadow-xl md:h-32 md:w-32">
                <AvatarImage
                  src={
                    user.profilePicture ||
                    user.host?.profilePhoto ||
                    user.admin?.profilePhoto ||
                    undefined
                  }
                />
                <AvatarFallback className="text-2xl md:text-3xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold md:text-4xl">
                    {user.name}
                  </h1>
                  {user.IsVerified && (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  )}
                </div>
                <p className="mb-3 text-muted-foreground">{user.email}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={roleBadge.color}>{roleBadge.label}</Badge>
                  <Badge className={statusBadge.color}>
                    {statusBadge.label}
                  </Badge>
                  {user.gender && (
                    <Badge variant="secondary">{user.gender}</Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Info */}
          <div className="space-y-6 lg:col-span-2">
            {/* USER ROLE: Basic Information */}
            {user.role === "USER" && (
              <>
                {/* Personal Information Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {user.bio && (
                      <div>
                        <p className="mb-1 text-sm font-medium">Bio</p>
                        <p className="text-sm text-muted-foreground">
                          {user.bio}
                        </p>
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      {user.phoneNumber && (
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <Phone className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Phone
                            </p>
                            <p className="text-sm font-medium">
                              {user.phoneNumber}
                            </p>
                          </div>
                        </div>
                      )}

                      {user.dateOfBirth && (
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                            <Calendar className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Date of Birth
                            </p>
                            <p className="text-sm font-medium">
                              {formatDate(user.dateOfBirth)}
                            </p>
                          </div>
                        </div>
                      )}

                      {user.address && (
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                            <MapPin className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Address
                            </p>
                            <p className="text-sm font-medium">
                              {user.address}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hobbies */}
                    {user.hobbies.length > 0 && (
                      <div>
                        <p className="mb-2 text-sm font-medium">Hobbies</p>
                        <div className="flex flex-wrap gap-2">
                          {user.hobbies.map((hobby, index) => (
                            <Badge key={index} variant="secondary">
                              {hobby}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interests */}
                    {user.interests.length > 0 && (
                      <div>
                        <p className="mb-2 text-sm font-medium">Interests</p>
                        <div className="flex flex-wrap gap-2">
                          {user.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {/* HOST ROLE: Host Information */}
            {user.role === "HOST" && user.host && (
              <>
                {/* Host Profile Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Host Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Host Stats */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-lg bg-muted/50 p-4 text-center">
                        <p className="text-2xl font-bold">
                          {user.host.totalEventsHosted}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Events Hosted
                        </p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <p className="text-2xl font-bold">
                            {user.host.rating}
                          </p>
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Rating ({user.host.reviewCount} reviews)
                        </p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-4 text-center">
                        <p className="text-2xl font-bold">
                          {user.host.totalParticipants}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Total Participants
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    {user.host.bio && (
                      <div>
                        <p className="mb-2 text-sm font-medium">About</p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {user.host.bio}
                        </p>
                      </div>
                    )}

                    {/* Experience */}
                    {user.host.experience && (
                      <div>
                        <p className="mb-2 text-sm font-medium">Experience</p>
                        <p className="text-sm text-muted-foreground">
                          {user.host.experience}
                        </p>
                      </div>
                    )}

                    {/* Specialties */}
                    {user.host.specialties && (
                      <div>
                        <p className="mb-2 text-sm font-medium">Specialties</p>
                        <div className="flex flex-wrap gap-2">
                          {user.host.specialties
                            .split(",")
                            .map((specialty, index) => (
                              <Badge key={index} variant="secondary">
                                {specialty.trim()}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Contact Information */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Contact
                          </p>
                          <p className="text-sm font-medium">
                            {user.host.contactNumber || "Not provided"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Location
                          </p>
                          <p className="text-sm font-medium">
                            {user.host.city && user.host.country
                              ? `${user.host.city}, ${user.host.country}`
                              : "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    {(user.host.websiteUrl ||
                      user.host.facebookUrl ||
                      user.host.instagramUrl ||
                      user.host.linkedinUrl) && (
                      <>
                        <Separator />
                        <div>
                          <p className="mb-3 text-sm font-medium">
                            Social Links
                          </p>
                          <div className="flex gap-2">
                            {user.host.websiteUrl && (
                              <Button size="icon" variant="outline" asChild>
                                <a
                                  href={user.host.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Globe className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {user.host.facebookUrl && (
                              <Button size="icon" variant="outline" asChild>
                                <a
                                  href={user.host.facebookUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Facebook className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {user.host.instagramUrl && (
                              <Button size="icon" variant="outline" asChild>
                                <a
                                  href={user.host.instagramUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Instagram className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {user.host.linkedinUrl && (
                              <Button size="icon" variant="outline" asChild>
                                <a
                                  href={user.host.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Host Business Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Business Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                          Verification Status
                        </p>
                        <Badge
                          className={
                            user.host.verificationStatus === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : user.host.verificationStatus === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {user.host.verificationStatus}
                        </Badge>
                      </div>

                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                          Max Event Limit
                        </p>
                        <p className="text-sm font-medium">
                          {user.host.maxEventLimit} events
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                          Total Earnings
                        </p>
                        <p className="text-sm font-medium">
                          ${user.host.totalEarnings}
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                          Payout Method
                        </p>
                        <p className="text-sm font-medium">
                          {user.host.payoutMethod || "Not set"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* ADMIN ROLE: Admin Information */}
            {user.role === "ADMIN" && user.admin && (
              <>
                {/* Admin Permissions Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Admin Permissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <PermissionItem
                        label="Manage Users"
                        enabled={user.admin.canManageUsers}
                      />
                      <PermissionItem
                        label="Manage Hosts"
                        enabled={user.admin.canManageHosts}
                      />
                      <PermissionItem
                        label="Manage Events"
                        enabled={user.admin.canManageEvents}
                      />
                      <PermissionItem
                        label="Manage Payments"
                        enabled={user.admin.canManagePayments}
                      />
                      <PermissionItem
                        label="Verify Hosts"
                        enabled={user.admin.canVerifyHosts}
                      />
                      <PermissionItem
                        label="Suspend Accounts"
                        enabled={user.admin.canSuspendAccounts}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Admin Activity Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Admin Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Login Count
                          </p>
                          <p className="text-sm font-medium">
                            {user.admin.loginCount || 0} times
                          </p>
                        </div>
                      </div>

                      {user.admin.lastLoginAt && (
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                            <Calendar className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Last Login
                            </p>
                            <p className="text-sm font-medium">
                              {formatDate(user.admin.lastLoginAt)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {user.admin.phoneNumber && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Contact Number
                          </p>
                          <p className="text-sm font-medium">
                            {user.admin.phoneNumber}
                          </p>
                        </div>
                      </div>
                    )}

                    {user.admin.address && (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Address
                          </p>
                          <p className="text-sm font-medium">
                            {user.admin.address}
                            {user.admin.city &&
                              user.admin.country &&
                              `, ${user.admin.city}, ${user.admin.country}`}
                          </p>
                        </div>
                      </div>
                    )}

                    {user.admin.adminNotes && (
                      <div>
                        <p className="mb-2 text-sm font-medium">Admin Notes</p>
                        <p className="text-sm text-muted-foreground">
                          {user.admin.adminNotes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Account Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">
                    Member Since
                  </p>
                  <p className="text-sm font-medium">
                    {formatDate(user.createdAt)}
                  </p>
                </div>

                <Separator />

                <div>
                  <p className="mb-1 text-xs text-muted-foreground">
                    Last Updated
                  </p>
                  <p className="text-sm font-medium">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>

                <Separator />

                <div>
                  <p className="mb-1 text-xs text-muted-foreground">
                    Verification Status
                  </p>
                  <div className="flex items-center gap-2">
                    {user.IsVerified ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          Verified
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-600">
                          Not Verified
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {user.needPasswordChange && (
                  <>
                    <Separator />
                    <div className="rounded-lg bg-yellow-50 p-3">
                      <p className="text-xs font-medium text-yellow-700">
                        Password change required
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Button>
                {user.role === "HOST" && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Award className="h-4 w-4" />
                    Manage Events
                  </Button>
                )}
                {user.role === "ADMIN" && (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Admin Dashboard
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Permission Item Component for Admin
const PermissionItem = ({
  label,
  enabled,
}: {
  label: string;
  enabled: boolean;
}) => (
  <div className="flex items-center justify-between rounded-lg border p-3">
    <span className="text-sm font-medium">{label}</span>
    {enabled ? (
      <CheckCircle2 className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600" />
    )}
  </div>
);

export default ProfileContent;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useActionState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  XCircle,
  Eye,
  MapPin,
  Mail,
  Phone,
  Calendar,
  FileText,
  AlertCircle,
  Clock,
  Shield,
} from "lucide-react";
import { hostsVerification } from "@/service/admin/host/hosts-verification";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Host {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  contactNumber: string | null;
  bio: string | null;
  experience: string | null;
  specialties: string | null;
  city: string | null;
  country: string | null;
  address: string | null;
  identityDocument: string | null;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason: string | null;
  preferredCommunication: string;
  payoutMethod: string | null;
  payoutAccount: string | null;
  websiteUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  createdAt: string;
}

interface HostVerificationTableProps {
  hosts: Host[];
}

const HostVerificationTable = ({ hosts }: HostVerificationTableProps) => {
  const router = useRouter();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);

  // Separate action states for approve and reject
  const [approveState, approveAction, approvePending] = useActionState(
    async (_: any, formData: FormData) => {
      if (!selectedHost) return null;
      return hostsVerification(selectedHost.id, formData);
    },
    null
  );

  const [rejectState, rejectAction, rejectPending] = useActionState(
    async (_: any, formData: FormData) => {
      if (!selectedHost) return null;
      return hostsVerification(selectedHost.id, formData);
    },
    null
  );

  // Handle approve success
  useEffect(() => {
    if (approveState?.success) {
      toast.success(approveState.message || "Host approved successfully");
      setApproveModalOpen(false);
      setSelectedHost(null);
      router.refresh();
    }
  }, [approveState, router]);

  // Handle reject success
  useEffect(() => {
    if (rejectState?.success) {
      toast.success(rejectState.message || "Host rejected successfully");
      setRejectModalOpen(false);
      setSelectedHost(null);
      router.refresh();
    }
  }, [rejectState, router]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const config = {
      PENDING: {
        variant: "secondary",
        color: "bg-yellow-100 text-yellow-700",
        icon: Clock,
      },
      APPROVED: {
        variant: "secondary",
        color: "bg-green-100 text-green-700",
        icon: CheckCircle,
      },
      REJECTED: {
        variant: "secondary",
        color: "bg-red-100 text-red-700",
        icon: XCircle,
      },
    };
    const { color, icon: Icon } =
      config[status as keyof typeof config] || config.PENDING;
    return { color, Icon };
  };

  // Handle view
  const handleView = (host: Host) => {
    setSelectedHost(host);
    setViewModalOpen(true);
  };

  // Handle approve
  const handleApprove = (host: Host) => {
    setSelectedHost(host);
    setApproveModalOpen(true);
  };

  // Handle reject
  const handleReject = (host: Host) => {
    setSelectedHost(host);
    setRejectModalOpen(true);
  };

  // Filter pending hosts
  const pendingHosts = hosts.filter((h) => h.verificationStatus === "PENDING");
  const approvedHosts = hosts.filter(
    (h) => h.verificationStatus === "APPROVED"
  );
  const rejectedHosts = hosts.filter(
    (h) => h.verificationStatus === "REJECTED"
  );

  return (
    <>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending
              </CardDescription>
              <CardTitle className="text-2xl text-yellow-600">
                {pendingHosts.length}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Approved
              </CardDescription>
              <CardTitle className="text-2xl text-green-600">
                {approvedHosts.length}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Rejected
              </CardDescription>
              <CardTitle className="text-2xl text-red-600">
                {rejectedHosts.length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Host Verification Requests</CardTitle>
            <CardDescription>
              Review and manage host verification requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Host</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hosts.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-32 text-center text-muted-foreground"
                      >
                        No host verification requests
                      </TableCell>
                    </TableRow>
                  ) : (
                    hosts.map((host) => {
                      const { color, Icon } = getStatusBadge(
                        host.verificationStatus
                      );
                      return (
                        <TableRow key={host.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={host.profilePhoto || undefined}
                                />
                                <AvatarFallback>
                                  {getInitials(host.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{host.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {host.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              {host.contactNumber && (
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  {host.contactNumber}
                                </div>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {host.preferredCommunication}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {host.city}, {host.country}
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {host.experience || "Not provided"}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Badge className={color}>
                              <Icon className="mr-1 h-3 w-3" />
                              {host.verificationStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(host.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleView(host)}
                              >
                                <Eye className="mr-1 h-4 w-4" />
                                View
                              </Button>
                              {host.verificationStatus === "PENDING" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => handleApprove(host)}
                                  >
                                    <CheckCircle className="mr-1 h-4 w-4" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleReject(host)}
                                  >
                                    <XCircle className="mr-1 h-4 w-4" />
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Details Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Host Details</DialogTitle>
            <DialogDescription>
              Complete information about the host verification request
            </DialogDescription>
          </DialogHeader>

          {selectedHost && (
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedHost.profilePhoto || undefined} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(selectedHost.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedHost.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedHost.email}
                  </p>
                  <div className="mt-2">
                    {(() => {
                      const { color, Icon } = getStatusBadge(
                        selectedHost.verificationStatus
                      );
                      return (
                        <Badge className={color}>
                          <Icon className="mr-1 h-3 w-3" />
                          {selectedHost.verificationStatus}
                        </Badge>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedHost.bio && (
                <div>
                  <Label className="text-base font-semibold">Bio</Label>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {selectedHost.bio}
                  </p>
                </div>
              )}

              {/* Contact Information */}
              <div>
                <Label className="text-base font-semibold">
                  Contact Information
                </Label>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedHost.contactNumber || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedHost.preferredCommunication}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {selectedHost.city}, {selectedHost.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedHost.address}</span>
                  </div>
                </div>
              </div>

              {/* Experience & Specialties */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-base font-semibold">Experience</Label>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {selectedHost.experience || "Not provided"}
                  </p>
                </div>
                <div>
                  <Label className="text-base font-semibold">Specialties</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedHost.specialties
                      ?.split(",")
                      .map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty.trim()}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>

              {/* Payout Information */}
              <div>
                <Label className="text-base font-semibold">
                  Payout Information
                </Label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Method: </span>
                    <span className="font-medium">
                      {selectedHost.payoutMethod || "Not provided"}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Account: </span>
                    <span className="font-medium">
                      {selectedHost.payoutAccount || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Identity Document */}
              {selectedHost.identityDocument && (
                <div>
                  <Label className="text-base font-semibold">
                    Identity Document
                  </Label>
                  <div className="mt-2">
                    <a
                      href={selectedHost.identityDocument}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <FileText className="h-4 w-4" />
                      View Document
                    </a>
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div>
                <Label className="text-base font-semibold">Social Links</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedHost.websiteUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={selectedHost.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Website
                      </a>
                    </Button>
                  )}
                  {selectedHost.facebookUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={selectedHost.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Facebook
                      </a>
                    </Button>
                  )}
                  {selectedHost.instagramUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={selectedHost.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                      </a>
                    </Button>
                  )}
                  {selectedHost.linkedinUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={selectedHost.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Rejection Reason */}
              {selectedHost.verificationStatus === "REJECTED" &&
                selectedHost.rejectionReason && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Rejection Reason:</strong>{" "}
                      {selectedHost.rejectionReason}
                    </AlertDescription>
                  </Alert>
                )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Modal */}
      <Dialog open={approveModalOpen} onOpenChange={setApproveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Host</DialogTitle>
            <DialogDescription>
              Confirm approval of {selectedHost?.name} as a verified host
            </DialogDescription>
          </DialogHeader>

          <form action={approveAction} className="space-y-4">
            <input type="hidden" name="status" value="APPROVED" />

            {approveState && !approveState.success && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{approveState.message}</AlertDescription>
              </Alert>
            )}

            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">
                    Ready to approve this host?
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    This will grant {selectedHost?.name} access to create and
                    manage events on the platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setApproveModalOpen(false)}
                disabled={approvePending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={approvePending}>
                {approvePending ? "Approving..." : "Confirm Approval"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Host</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting {selectedHost?.name}&apos;s
              verification request
            </DialogDescription>
          </DialogHeader>

          <form action={rejectAction} className="space-y-4">
            <input type="hidden" name="status" value="REJECTED" />

            {rejectState && !rejectState.success && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{rejectState.message}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="rejectionReason">
                Rejection Reason <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="rejectionReason"
                name="rejectionReason"
                placeholder="Please provide a clear reason for rejection..."
                className="mt-2 min-h-[120px]"
                required
                disabled={rejectPending}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                This message will be sent to the host. Be professional and
                constructive.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRejectModalOpen(false)}
                disabled={rejectPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={rejectPending}
              >
                {rejectPending ? "Rejecting..." : "Confirm Rejection"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HostVerificationTable;

"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  UserCheck,
} from "lucide-react";
import Image from "next/image";

interface EventParticipant {
  id: string;
  eventId: string;
  userId: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  bookingStatus: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  paymentId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: string;
  eventId: string;
  hostId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface BookedEvent {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  city: string;
  country: string;
  minParticipants: number;
  maxParticipants: number;
  joiningFee: number;
  status: "OPEN" | "CLOSED" | "COMPLETED" | "CANCELLED";
  eventCategory: {
    id: string;
    name: string;
  };
  host: {
    name: string;
    rating: number;
    reviewCount: number;
    profilePhoto: string | null;
  };
  reviews: Review[];
  eventParticipants: EventParticipant[];
  createdAt: string;
  updatedAt: string;
}

interface MyBookedEventsProps {
  events: BookedEvent[];
}

const MyBookedEvents = ({ events }: MyBookedEventsProps) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [participantsModalOpen, setParticipantsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<BookedEvent | null>(null);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format datetime
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: "bg-yellow-100 text-yellow-700",
      CONFIRMED: "bg-blue-100 text-blue-700",
      COMPLETED: "bg-green-100 text-green-700",
      CANCELLED: "bg-red-100 text-red-700",
      OPEN: "bg-green-100 text-green-700",
      CLOSED: "bg-red-100 text-red-700",
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
    );
  };

  // Handle view event
  const handleViewEvent = (event: BookedEvent) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  // Handle view participants
  const handleViewParticipants = (event: BookedEvent) => {
    setSelectedEvent(event);
    setParticipantsModalOpen(true);
  };

  // Calculate total revenue for an event
  const calculateRevenue = (event: BookedEvent) => {
    return event.eventParticipants.length * event.joiningFee;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Booked Events</CardTitle>
          <CardDescription>
            Events with confirmed bookings and participants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No bookings yet. Keep promoting your events!
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        {event.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {event.eventCategory.name}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(event.date)}</TableCell>
                      <TableCell>
                        {event.city}, {event.country}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {event.eventParticipants.length}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            / {event.maxParticipants}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">
                          ${calculateRevenue(event)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(event.status)}>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewEvent(event)}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            Details
                          </Button>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleViewParticipants(event)}
                          >
                            <UserCheck className="mr-1 h-4 w-4" />
                            Participants
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>
              Complete information about this booked event
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-6">
              {/* Event Image */}
              {selectedEvent.image && (
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    height={400}
                    width={800}
                    src={selectedEvent.image}
                    alt={selectedEvent.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/800x400?text=Event+Image";
                    }}
                  />
                </div>
              )}

              {/* Basic Info */}
              <div>
                <h3 className="mb-2 text-2xl font-bold">
                  {selectedEvent.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusBadge(selectedEvent.status)}>
                    {selectedEvent.status}
                  </Badge>
                  <Badge variant="secondary">
                    {selectedEvent.eventCategory.name}
                  </Badge>
                  <Badge variant="outline">{selectedEvent.type}</Badge>
                </div>
              </div>

              <Separator />

              {/* Booking Stats */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Total Bookings
                    </CardDescription>
                    <CardTitle className="text-2xl">
                      {selectedEvent.eventParticipants.length}
                    </CardTitle>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Total Revenue
                    </CardDescription>
                    <CardTitle className="text-2xl text-green-600">
                      ${calculateRevenue(selectedEvent)}
                    </CardTitle>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Reviews
                    </CardDescription>
                    <CardTitle className="text-2xl">
                      {selectedEvent.reviews.length}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Description */}
              <div>
                <h4 className="mb-2 font-semibold">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Date & Time */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Event Date</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(selectedEvent.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Event Time</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h4 className="mb-3 font-semibold">Location</h4>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {selectedEvent.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.city}, {selectedEvent.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              {selectedEvent.reviews.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="mb-3 font-semibold">
                      Reviews ({selectedEvent.reviews.length})
                    </h4>
                    <div className="space-y-3">
                      {selectedEvent.reviews.map((review) => (
                        <div key={review.id} className="rounded-lg border p-3">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Participants Modal */}
      <Dialog
        open={participantsModalOpen}
        onOpenChange={setParticipantsModalOpen}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Event Participants</DialogTitle>
            <DialogDescription>
              {selectedEvent && (
                <>
                  {selectedEvent.name} •{" "}
                  {selectedEvent.eventParticipants.length} participants
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid gap-4 sm:grid-cols-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Total Bookings</CardDescription>
                    <CardTitle className="text-2xl">
                      {selectedEvent.eventParticipants.length}
                    </CardTitle>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Completed</CardDescription>
                    <CardTitle className="text-2xl text-green-600">
                      {
                        selectedEvent.eventParticipants.filter(
                          (p) => p.bookingStatus === "COMPLETED"
                        ).length
                      }
                    </CardTitle>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Confirmed</CardDescription>
                    <CardTitle className="text-2xl text-blue-600">
                      {
                        selectedEvent.eventParticipants.filter(
                          (p) => p.bookingStatus === "CONFIRMED"
                        ).length
                      }
                    </CardTitle>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Revenue</CardDescription>
                    <CardTitle className="text-2xl text-green-600">
                      ${calculateRevenue(selectedEvent)}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Separator />

              {/* Participants List */}
              <div>
                <h4 className="mb-4 font-semibold">Participant Details</h4>
                <div className="space-y-3">
                  {selectedEvent.eventParticipants.map((participant, index) => (
                    <Card key={participant.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            {/* Participant Number */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <span className="font-semibold text-primary">
                                #{index + 1}
                              </span>
                            </div>

                            {/* Participant Info */}
                            <div>
                              <div className="mb-1 flex items-center gap-2">
                                <p className="font-medium">
                                  Participant ID:{" "}
                                  {participant.userId.slice(0, 8)}...
                                </p>
                                <Badge
                                  className={getStatusBadge(
                                    participant.bookingStatus
                                  )}
                                >
                                  {participant.bookingStatus}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Booked:{" "}
                                  {formatDateTime(participant.createdAt)}
                                </span>
                                {participant.paymentId && (
                                  <span className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                    Payment ID:{" "}
                                    {participant.paymentId.slice(0, 8)}
                                    ...
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Fee */}
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Fee</p>
                            <p className="text-lg font-semibold text-green-600">
                              ${selectedEvent.joiningFee}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Event Info Summary */}
              <Separator />
              <div className="grid gap-4 rounded-lg bg-muted/50 p-4 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">
                    Event Date
                  </p>
                  <p className="font-medium">
                    {formatDate(selectedEvent.date)} at {selectedEvent.time}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">
                    {selectedEvent.city}, {selectedEvent.country}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Capacity</p>
                  <p className="font-medium">
                    {selectedEvent.eventParticipants.length} /{" "}
                    {selectedEvent.maxParticipants} participants
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">
                    Total Revenue
                  </p>
                  <p className="font-medium text-green-600">
                    ${calculateRevenue(selectedEvent)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyBookedEvents;

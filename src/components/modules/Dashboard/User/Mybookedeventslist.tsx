"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Search,
  Filter,
  Eye,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Event {
  id: string;
  hostId: string;
  name: string;
  type: string;
  categoryId: string;
  description: string;
  image: string;
  eventBookingDeadline: string;
  date: string;
  time: string;
  location: string;
  city: string;
  country: string;
  minParticipants: number;
  maxParticipants: number;
  joiningFee: number;
  status: "OPEN" | "CLOSED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface BookedEvent {
  id: string;
  eventId: string;
  userId: string;
  status: "JOINED" | "CANCELLED" | "COMPLETED";
  bookingStatus: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  paymentId: string | null;
  createdAt: string;
  updatedAt: string;
  event: Event;
}

interface MyBookedEventsListProps {
  events: BookedEvent[];
}

const MyBookedEventsList = ({ events }: MyBookedEventsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const config = {
      JOINED: "bg-blue-100 text-blue-700",
      COMPLETED: "bg-green-100 text-green-700",
      CANCELLED: "bg-red-100 text-red-700",
      OPEN: "bg-green-100 text-green-700",
      CLOSED: "bg-red-100 text-red-700",
    };
    return config[status as keyof typeof config] || "bg-gray-100 text-gray-700";
  };

  // Get payment status badge
  const getPaymentBadge = (status: string) => {
    const config = {
      PENDING: "bg-yellow-100 text-yellow-700",
      CONFIRMED: "bg-blue-100 text-blue-700",
      COMPLETED: "bg-green-100 text-green-700",
      CANCELLED: "bg-red-100 text-red-700",
    };
    return config[status as keyof typeof config] || "bg-gray-100 text-gray-700";
  };

  // Check if event is upcoming
  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  // Filter events
  const filteredEvents = events.filter((booking) => {
    const matchesSearch =
      booking.event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.event.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.event.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    const matchesPayment =
      paymentFilter === "all" || booking.bookingStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Group events
  const upcomingEvents = filteredEvents.filter((b) => isUpcoming(b.event.date));
  const pastEvents = filteredEvents.filter((b) => !isUpcoming(b.event.date));

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Booking Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Booking Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="JOINED">Joined</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* Payment Status Filter */}
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Bookings</CardDescription>
            <CardTitle className="text-3xl">{events.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Upcoming Events</CardDescription>
            <CardTitle className="text-3xl text-primary">
              {upcomingEvents.length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Past Events</CardDescription>
            <CardTitle className="text-3xl text-muted-foreground">
              {pastEvents.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Upcoming Events</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((booking) => (
              <Card
                key={booking.id}
                className="group overflow-hidden transition-all hover:shadow-lg"
              >
                {/* Event Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={booking.event.image}
                    alt={booking.event.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=Event";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="line-clamp-2 font-semibold text-white">
                      {booking.event.name}
                    </h3>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getStatusBadge(booking.status)}>
                      {booking.status}
                    </Badge>
                    <Badge className={getPaymentBadge(booking.bookingStatus)}>
                      Payment: {booking.bookingStatus}
                    </Badge>
                    <Badge variant="outline">{booking.event.type}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Date & Time */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(booking.event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.event.time}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="line-clamp-1">
                      {booking.event.city}, {booking.event.country}
                    </span>
                  </div>

                  {/* Participants */}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {booking.event.minParticipants} -{" "}
                      {booking.event.maxParticipants} participants
                    </span>
                  </div>

                  {/* Fee */}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-green-600">
                      ${booking.event.joiningFee}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button className="w-full" asChild>
                    <Link href={`/events/${booking.event.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Past Events</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((booking) => (
              <Card
                key={booking.id}
                className="group overflow-hidden opacity-90 transition-all hover:opacity-100 hover:shadow-lg"
              >
                {/* Event Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={booking.event.image}
                    alt={booking.event.name}
                    fill
                    className="object-cover grayscale transition-all group-hover:grayscale-0"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=Event";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="line-clamp-2 font-semibold text-white">
                      {booking.event.name}
                    </h3>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getStatusBadge(booking.status)}>
                      {booking.status}
                    </Badge>
                    <Badge className={getPaymentBadge(booking.bookingStatus)}>
                      {booking.bookingStatus}
                    </Badge>
                    <Badge variant="outline">{booking.event.type}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Date & Time */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(booking.event.date)}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="line-clamp-1">
                      {booking.event.city}, {booking.event.country}
                    </span>
                  </div>

                  {/* Fee */}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">
                      ${booking.event.joiningFee}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={`/events/${booking.event.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <Calendar className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No events found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery || statusFilter !== "all" || paymentFilter !== "all"
                ? "Try adjusting your filters"
                : "You haven't booked any events yet"}
            </p>
            {!searchQuery &&
              statusFilter === "all" &&
              paymentFilter === "all" && (
                <Button className="mt-4" asChild>
                  <Link href="/events">Browse Events</Link>
                </Button>
              )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyBookedEventsList;

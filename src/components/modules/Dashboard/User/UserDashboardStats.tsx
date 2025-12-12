"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Heart,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface UserDashboardData {
  overview: {
    totalBookings: number;
    upcomingEvents: number;
    completedEvents: number;
    cancelledBookings: number;
    totalSpent: number;
    reviewsGiven: number;
  };
  recentBookings: Array<{
    id: string;
    status: string;
    bookingStatus: string;
    createdAt: string;
    event: {
      id: string;
      name: string;
      date: string;
      time: string;
      city: string;
      country: string;
      joiningFee: number;
      status: string;
      image: string | null;
      eventCategory: {
        name: string;
      };
      host: {
        name: string;
        profilePhoto: string | null;
      };
    };
  }>;
  upcomingEvents: Array<{
    id: string;
    bookingStatus: string;
    event: {
      id: string;
      name: string;
      date: string;
      time: string;
      city: string;
      country: string;
      location: string;
      image: string | null;
      joiningFee: number;
      eventCategory: {
        name: string;
      };
      host: {
        name: string;
        contactNumber: string | null;
        email: string;
      };
    };
  }>;
  favoriteCategories: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

interface UserDashboardStatsProps {
  data: UserDashboardData;
}

const UserDashboardStats = ({ data }: UserDashboardStatsProps) => {
  const { overview, recentBookings, upcomingEvents, favoriteCategories } = data;

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format full date with day
  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if event is today or tomorrow
  const getEventTiming = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) return "Today";
    if (eventDate.getTime() === tomorrow.getTime()) return "Tomorrow";
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold md:text-4xl">My Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Track your bookings and discover new events
        </p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Bookings</CardDescription>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalBookings}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {overview.completedEvents} completed
            </p>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Upcoming Events</CardDescription>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {overview.upcomingEvents}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Events to attend
            </p>
          </CardContent>
        </Card>

        {/* Total Spent */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Spent</CardDescription>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${overview.totalSpent}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              On {overview.totalBookings} bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Reviews Given</CardDescription>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.reviewsGiven}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Completed</CardDescription>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {overview.completedEvents}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Cancelled</CardDescription>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overview.cancelledBookings}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Your next {upcomingEvents.length} event
                  {upcomingEvents.length > 1 ? "s" : ""}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/events">Explore More</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((booking) => {
                const timing = getEventTiming(booking.event.date);
                return (
                  <Card key={booking.id} className="border-none bg-background">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Event Image */}
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            height={400}
                            width={400}
                            src={
                              booking.event.image ||
                              "https://via.placeholder.com/200x200?text=Event"
                            }
                            alt={booking.event.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/200x200?text=Event";
                            }}
                          />
                          {timing && (
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1 text-center text-xs font-semibold text-white">
                              {timing}
                            </div>
                          )}
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 space-y-2">
                          <div>
                            <h4 className="font-semibold line-clamp-1">
                              {booking.event.name}
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {booking.event.eventCategory.name}
                              </Badge>
                              <Badge
                                className={`text-xs ${
                                  booking.bookingStatus === "COMPLETED"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {booking.bookingStatus}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatFullDate(booking.event.date)} at{" "}
                              {booking.event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {booking.event.city}, {booking.event.country}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-green-600">
                              ${booking.event.joiningFee}
                            </span>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/events/${booking.event.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Recent Bookings */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your booking history</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/user/bookings">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <div className="py-12 text-center">
                <Ticket className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No bookings yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Start exploring events and book your first one!
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/events">Browse Events</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentBookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={booking.event.host.profilePhoto || undefined}
                      />
                      <AvatarFallback>
                        {getInitials(booking.event.host.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium line-clamp-1 text-sm">
                            {booking.event.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            by {booking.event.host.name}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`${
                            booking.bookingStatus === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : booking.bookingStatus === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {booking.bookingStatus}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(booking.event.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {booking.event.city}
                        </span>
                        <span className="font-medium text-green-600">
                          ${booking.event.joiningFee}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Favorite Categories & Quick Links */}
        <div className="space-y-4 lg:col-span-3">
          {/* Favorite Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Favorite Categories
              </CardTitle>
              <CardDescription>Events you love most</CardDescription>
            </CardHeader>
            <CardContent>
              {favoriteCategories.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  Book more events to see your favorites
                </p>
              ) : (
                <div className="space-y-3">
                  {favoriteCategories.map((category, index) => {
                    const maxCount = Math.max(
                      ...favoriteCategories.map((c) => c.count)
                    );
                    const percentage =
                      maxCount > 0 ? (category.count / maxCount) * 100 : 0;

                    return (
                      <div key={category.id} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-muted-foreground">
                            {category.count} events
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/events">
                  <Calendar className="mr-2 h-4 w-4" />
                  Browse Events
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link href="/dashboard/user/bookings">
                  <Ticket className="mr-2 h-4 w-4" />
                  My Bookings
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link href="/dashboard/user/profile">
                  <Users className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Empty State CTA */}
      {overview.totalBookings === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">Start Your Journey</h3>
            <p className="mb-6 text-center text-sm text-muted-foreground max-w-md">
              Discover amazing events happening around you and connect with
              like-minded people
            </p>
            <Button size="lg" asChild>
              <Link href="/events">Explore Events</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDashboardStats;

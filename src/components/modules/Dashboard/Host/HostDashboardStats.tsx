/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Users,
  DollarSign,
  TrendingUp,
  Star,
  CheckCircle,
  Clock,
  Activity,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

interface HostDashboardData {
  overview: {
    totalEvents: number;
    activeEvents: number;
    completedEvents: number;
    upcomingEvents: number;
    totalBookings: number;
    totalRevenue: number;
    averageRating: number;
    totalReviews: number;
  };
  bookingBreakdown: Array<{
    status: string;
    count: number;
  }>;
  recentBookings: Array<{
    id: string;
    status: string;
    bookingStatus: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      email: string;
      profilePicture: string | null;
    };
    event: {
      id: string;
      name: string;
      date: string;
      joiningFee: number;
    };
  }>;
  eventPerformance: Array<{
    id: string;
    name: string;
    date: string;
    status: string;
    joiningFee: number;
    maxParticipants: number;
    bookingsCount: number;
    reviewsCount: number;
    revenue: number;
    occupancyRate: number;
  }>;
  monthlyRevenue: Array<{
    month: string;
    bookings: number;
    revenue: number;
  }>;
  upcomingEvents: any[];
}

interface HostDashboardStatsProps {
  data: HostDashboardData;
}

const HostDashboardStats = ({ data }: HostDashboardStatsProps) => {
  const { overview, recentBookings, eventPerformance, monthlyRevenue } = data;

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time ago
  const timeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  // Get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold md:text-4xl">Host Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here is an overview of your events
        </p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Events</CardDescription>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalEvents}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {overview.activeEvents} active, {overview.completedEvents}{" "}
              completed
            </p>
          </CardContent>
        </Card>

        {/* Total Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Bookings</CardDescription>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalBookings}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Across all events
            </p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${overview.totalRevenue}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              From all bookings
            </p>
          </CardContent>
        </Card>

        {/* Average Rating */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Average Rating</CardDescription>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{overview.averageRating}</div>
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {overview.totalReviews} reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart & Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue Trend */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Last 6 months revenue overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyRevenue.map((month, index) => {
                const maxRevenue = Math.max(
                  ...monthlyRevenue.map((m) => m.revenue)
                );
                const percentage =
                  maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0;

                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{month.month}</span>
                      <span className="text-muted-foreground">
                        ${month.revenue} ({month.bookings} bookings)
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
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" asChild>
              <Link href="/dashboard/host/events/create">
                <Calendar className="mr-2 h-4 w-4" />
                Create New Event
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/host/events">
                <Activity className="mr-2 h-4 w-4" />
                View All Events
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/host/booked-events">
                <Users className="mr-2 h-4 w-4" />
                Booked Events
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/host/profile">
                <Star className="mr-2 h-4 w-4" />
                View Profile & Reviews
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Event Performance & Recent Bookings */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Top Events Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Events</CardTitle>
                <CardDescription>Your best performing events</CardDescription>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {eventPerformance.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No event data available yet
              </div>
            ) : (
              <div className="space-y-4">
                {eventPerformance.slice(0, 5).map((event, index) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                        <p className="font-medium line-clamp-1">{event.name}</p>
                      </div>
                      <div className="ml-8 mt-1 flex gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.bookingsCount}/{event.maxParticipants}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {event.reviewsCount}
                        </span>
                        <Badge variant="secondary" className="h-5 text-xs">
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        ${event.revenue}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.occupancyRate}% full
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest participant bookings</CardDescription>
              </div>
              <CheckCircle className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No bookings yet
              </div>
            ) : (
              <div className="space-y-4">
                {recentBookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={booking.user.profilePicture || undefined}
                      />
                      <AvatarFallback>
                        {getInitials(booking.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">
                          {booking.user.name}
                        </p>
                        <Badge
                          variant="secondary"
                          className={
                            booking.bookingStatus === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        >
                          {booking.bookingStatus}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {booking.event.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {timeAgo(booking.createdAt)}
                        <span>•</span>
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
      </div>

      {/* Bottom CTA */}
      {overview.totalEvents === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No events yet</h3>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              Start by creating your first event and building your community
            </p>
            <Button asChild>
              <Link href="/dashboard/host/events/create">
                Create Your First Event
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HostDashboardStats;

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
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  Star,
  AlertCircle,
  PieChart,
} from "lucide-react";

interface AdminDashboardData {
  overview: {
    totalUsers: number;
    totalHosts: number;
    totalEvents: number;
    totalBookings: number;
    totalRevenue: number;
    activeEvents: number;
    completedEvents: number;
    pendingVerifications: number;
  };
  growth: {
    recentUsers: number;
    recentHosts: number;
    recentEvents: number;
    recentBookings: number;
    userGrowthRate: number;
    hostGrowthRate: number;
    eventGrowthRate: number;
    revenueGrowthRate: number;
  };
  eventBreakdown: Array<{
    status: string;
    count: number;
  }>;
  paymentBreakdown: Array<{
    status: string;
    count: number;
  }>;
  categoryStats: Array<{
    id: string;
    name: string;
    eventCount: number;
  }>;
  topRatedHosts: Array<{
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
    rating: number;
    reviewCount: number;
    totalEventsHosted: number;
    totalEarnings: number;
  }>;
  popularEvents: Array<{
    id: string;
    name: string;
    type: string;
    date: string;
    city: string;
    country: string;
    joiningFee: number;
    status: string;
    host: {
      name: string;
      profilePhoto: string | null;
    };
    bookingsCount: number;
    reviewsCount: number;
  }>;
  monthlyStats: Array<{
    month: string;
    users: number;
    hosts: number;
    events: number;
    bookings: number;
    revenue: number;
  }>;
}

interface AdminDashboardStatsProps {
  data: AdminDashboardData;
}

const AdminDashboardStats = ({ data }: AdminDashboardStatsProps) => {
  const {
    overview,
    growth,
    eventBreakdown,
    paymentBreakdown,
    categoryStats,
    topRatedHosts,
    popularEvents,
    monthlyStats,
  } = data;

  // Get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format number
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold md:text-4xl">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          System-wide overview and analytics
        </p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Users</CardDescription>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalUsers}</div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              {growth.userGrowthRate >= 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">
                    +{growth.userGrowthRate.toFixed(1)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-red-600">
                    {growth.userGrowthRate.toFixed(1)}%
                  </span>
                </>
              )}
              <span className="text-muted-foreground">
                {growth.recentUsers} this month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Hosts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Hosts</CardDescription>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalHosts}</div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              {growth.hostGrowthRate >= 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">
                    +{growth.hostGrowthRate.toFixed(1)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-red-600">
                    {growth.hostGrowthRate.toFixed(1)}%
                  </span>
                </>
              )}
              <span className="text-muted-foreground">
                {growth.recentHosts} this month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Events</CardDescription>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalEvents}</div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              {growth.eventGrowthRate >= 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">
                    +{growth.eventGrowthRate.toFixed(1)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-red-600">
                    {growth.eventGrowthRate.toFixed(1)}%
                  </span>
                </>
              )}
              <span className="text-muted-foreground">
                {growth.recentEvents} this month
              </span>
            </div>
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
              ${formatNumber(overview.totalRevenue)}
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              {growth.revenueGrowthRate >= 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">
                    +{growth.revenueGrowthRate.toFixed(1)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-red-600">
                    {growth.revenueGrowthRate.toFixed(1)}%
                  </span>
                </>
              )}
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Events</CardDescription>
            <CardTitle className="text-2xl">{overview.activeEvents}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed Events</CardDescription>
            <CardTitle className="text-2xl">
              {overview.completedEvents}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Bookings</CardDescription>
            <CardTitle className="text-2xl">{overview.totalBookings}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-1">
              Pending Verifications
              {overview.pendingVerifications > 0 && (
                <AlertCircle className="h-3 w-3 text-yellow-600" />
              )}
            </CardDescription>
            <CardTitle
              className={`text-2xl ${
                overview.pendingVerifications > 0 ? "text-yellow-600" : ""
              }`}
            >
              {overview.pendingVerifications}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Charts & Breakdowns */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Monthly Trends */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>6-Month Trend</CardTitle>
            <CardDescription>System growth overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((month, index) => {
                const maxValue = Math.max(
                  ...monthlyStats.map((m) => m.users + m.hosts + m.events)
                );
                const total = month.users + month.hosts + month.events;
                const percentage = maxValue > 0 ? (total / maxValue) * 100 : 0;

                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{month.month}</span>
                      <span className="text-muted-foreground">
                        {month.users}U • {month.hosts}H • {month.events}E
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Status Breakdowns */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Event & payment breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Event Status */}
            <div>
              <p className="mb-3 text-sm font-medium">Event Status</p>
              <div className="space-y-2">
                {eventBreakdown.map((item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.status === "OPEN"
                            ? "bg-green-500"
                            : item.status === "COMPLETED"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }`}
                      />
                      <span className="text-sm">{item.status}</span>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Status */}
            <div>
              <p className="mb-3 text-sm font-medium">Payment Status</p>
              <div className="space-y-2">
                {paymentBreakdown.map((item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.status === "COMPLETED"
                            ? "bg-green-500"
                            : item.status === "PENDING"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm">{item.status}</span>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Stats & Top Hosts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Category Statistics */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Popular Categories</CardTitle>
                <CardDescription>Events by category</CardDescription>
              </div>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {categoryStats.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No category data available
              </div>
            ) : (
              <div className="space-y-3">
                {categoryStats.slice(0, 5).map((category, index) => {
                  const maxCount = Math.max(
                    ...categoryStats.map((c) => c.eventCount)
                  );
                  const percentage =
                    maxCount > 0 ? (category.eventCount / maxCount) * 100 : 0;

                  return (
                    <div key={category.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-muted-foreground">
                          {category.eventCount} events
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

        {/* Top Rated Hosts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Rated Hosts</CardTitle>
                <CardDescription>Best performing hosts</CardDescription>
              </div>
              <Star className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {topRatedHosts.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No hosts available
              </div>
            ) : (
              <div className="space-y-4">
                {topRatedHosts.slice(0, 5).map((host, index) => (
                  <div key={host.id} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={host.profilePhoto || undefined} />
                      <AvatarFallback>{getInitials(host.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{host.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {host.rating}
                        </div>
                        <span>•</span>
                        <span>{host.reviewCount} reviews</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">
                        ${host.totalEarnings}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {host.totalEventsHosted} events
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Popular Events */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Events</CardTitle>
          <CardDescription>
            Most booked events across the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {popularEvents.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No events available
            </div>
          ) : (
            <div className="space-y-4">
              {popularEvents.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={event.host.profilePhoto || undefined} />
                      <AvatarFallback>
                        {getInitials(event.host.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{event.name}</p>
                      <p className="text-xs text-muted-foreground">
                        by {event.host.name}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {event.type}
                        </Badge>
                        <Badge
                          className={`text-xs ${
                            event.status === "OPEN"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      ${event.joiningFee}
                    </p>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {event.bookingsCount} bookings
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardStats;

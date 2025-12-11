/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllMyBookedEvent } from "@/service/host/host-booked-event";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Suspense } from "react";
import BookedEventsTableSkeleton from "@/components/modules/Host/BookedEventsTableSkeleton";
import MyBookedEvents from "@/components/modules/Host/MyBookedEvents";

const MyBookedEventPage = async () => {
  // Fetch booked events
  const response = await getAllMyBookedEvent();
  // Handle error
  if (!response.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Booked Events</h1>
          <p className="text-muted-foreground">
            Events with confirmed bookings and participants
          </p>
        </div>

        {/* Error Alert */}
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Booked Events</AlertTitle>
          <AlertDescription>
            {response.message || "Failed to load booked events"}
            <br />
            <span className="text-sm">
              Please try again later or contact support if the problem persists.
            </span>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const events = response.data || [];

  // Calculate statistics
  const totalBookings = events.reduce(
    (acc: any, event: any) => acc + event.eventParticipants.length,
    0
  );

  const totalRevenue = events.reduce(
    (acc: any, event: any) =>
      acc + event.eventParticipants.length * event.joiningFee,
    0
  );

  const completedEvents = events.filter(
    (event: any) => event.status === "COMPLETED"
  ).length;

  const averageBookingsPerEvent =
    events.length > 0 ? (totalBookings / events.length).toFixed(1) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Booked Events</h1>
        <p className="text-muted-foreground">
          Manage events with confirmed bookings and track your participants
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Events with Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Events with Bookings</CardDescription>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{events.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Active booked events
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
            <div className="text-3xl font-bold">{totalBookings}</div>
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
            <div className="text-3xl font-bold text-green-600">
              ${totalRevenue}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              From all bookings
            </p>
          </CardContent>
        </Card>

        {/* Average Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Avg. Bookings/Event</CardDescription>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageBookingsPerEvent}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {completedEvents} completed events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      {events.length > 0 && (
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Most Booked Event</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const mostBooked = events.reduce((prev: any, current: any) =>
                  prev.eventParticipants.length >
                  current.eventParticipants.length
                    ? prev
                    : current
                );
                return (
                  <div>
                    <p className="font-medium">{mostBooked.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {mostBooked.eventParticipants.length} participants
                    </p>
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Highest Revenue Event</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const highestRevenue = events.reduce(
                  (prev: any, current: any) => {
                    const prevRevenue =
                      prev.eventParticipants.length * prev.joiningFee;
                    const currentRevenue =
                      current.eventParticipants.length * current.joiningFee;
                    return prevRevenue > currentRevenue ? prev : current;
                  }
                );
                const revenue =
                  highestRevenue.eventParticipants.length *
                  highestRevenue.joiningFee;
                return (
                  <div>
                    <p className="font-medium">{highestRevenue.name}</p>
                    <p className="text-sm text-green-600 font-semibold">
                      ${revenue}
                    </p>
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Booking Status</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const completed = events.reduce(
                  (acc: any, event: any) =>
                    acc +
                    event.eventParticipants.filter(
                      (p: any) => p.bookingStatus === "COMPLETED"
                    ).length,
                  0
                );
                const confirmed = events.reduce(
                  (acc: any, event: any) =>
                    acc +
                    event.eventParticipants.filter(
                      (p: any) => p.bookingStatus === "CONFIRMED"
                    ).length,
                  0
                );
                return (
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium text-green-600">
                        {completed}
                      </span>{" "}
                      completed
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-blue-600">
                        {confirmed}
                      </span>{" "}
                      confirmed
                    </p>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Events Table */}
      <Suspense fallback={<BookedEventsTableSkeleton />}>
        <MyBookedEvents events={events} />
      </Suspense>
    </div>
  );
};

export default MyBookedEventPage;

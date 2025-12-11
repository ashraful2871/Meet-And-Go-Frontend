/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHostEvents } from "@/service/host/get-host-events";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import EventsTableSkeleton from "@/components/modules/Host/EventsTableSkeleton";
import HostEvents from "@/components/modules/Host/HostEvents";

const MyEventsPage = async () => {
  // Fetch host events
  const response = await getHostEvents();

  // Handle error
  if (!response.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">My Events</h1>
            <p className="text-muted-foreground">
              Manage and track all your hosted events
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/host/events/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>

        {/* Error Alert */}
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Events</AlertTitle>
          <AlertDescription>
            {response.message || "Failed to load your events"}
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">My Events</h1>
          <p className="text-muted-foreground">
            Manage and track all your hosted events
          </p>
        </div>
        <Button asChild>
          <Link href="/host/dashboard/create-events">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Events</CardDescription>
            <CardTitle className="text-3xl">{events.length}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Open Events</CardDescription>
            <CardTitle className="text-3xl">
              {events.filter((e: any) => e.status === "OPEN").length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-3xl">
              {events.filter((e: any) => e.status === "COMPLETED").length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Reviews</CardDescription>
            <CardTitle className="text-3xl">
              {events.reduce((acc: any, e: any) => acc + e.reviews.length, 0)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Events Table */}
      <Suspense fallback={<EventsTableSkeleton />}>
        <HostEvents events={events} />
      </Suspense>
    </div>
  );
};

export default MyEventsPage;

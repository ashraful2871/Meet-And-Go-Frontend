import { myBookedEvents } from "@/service/event/my-booked-event";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Calendar } from "lucide-react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MyBookedEventsListSkeleton from "@/components/modules/Dashboard/Mybookedeventslistskeleton";
import MyBookedEventsList from "@/components/modules/Dashboard/User/Mybookedeventslist";

const MyBookedEventsPage = async () => {
  const response = await myBookedEvents();

  // Handle error
  if (!response.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold md:text-4xl">My Booked Events</h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            View and manage all your event bookings
          </p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Your Bookings</AlertTitle>
          <AlertDescription>
            {response.message || "Failed to load your booked events"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const events = response.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold md:text-4xl">
                My Booked Events
              </h1>
            </div>
            <p className="mt-2 text-muted-foreground">
              Track your upcoming events and past experiences
            </p>
          </div>
          <Button asChild>
            <Link href="/events">Browse More Events</Link>
          </Button>
        </div>
      </div>

      {/* Events List */}
      <Suspense fallback={<MyBookedEventsListSkeleton />}>
        <MyBookedEventsList events={events} />
      </Suspense>
    </div>
  );
};

export default MyBookedEventsPage;

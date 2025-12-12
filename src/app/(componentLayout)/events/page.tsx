import { Suspense } from "react";
import { getAllEvents } from "@/service/event/all-event";
import AllEvents from "@/components/modules/All-Events/AllEvents";
import EventsPageSkeleton from "@/components/modules/All-Events/EventsPageSkeleton";

const AllEventsPage = async () => {
  const events = await getAllEvents();
  return (
    <>
      <Suspense fallback={<EventsPageSkeleton />}>
        <AllEvents initialEvents={events?.data} />
      </Suspense>
    </>
  );
};

export default AllEventsPage;

import EventDetailsSkeleton from "@/components/modules/All-Events/EventDetailsSkeleton";
import EventDetailsContent from "@/components/modules/Home/EventDetailsContent";
import { getSingleEvent } from "@/service/event/single-event";
import React, { Suspense } from "react";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const singleEvent = await getSingleEvent(id); //await getSingleEvent(id);
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetailsContent event={singleEvent?.data} />
    </Suspense>
  );
};

export default EventDetailsPage;

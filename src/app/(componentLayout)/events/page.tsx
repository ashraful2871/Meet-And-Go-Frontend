import { Suspense } from "react";
import { IEvents } from "@/types/event.interface";
import { getAllEvents } from "@/service/event/all-event";
import AllEvents from "@/components/modules/All-Events/AllEvents";

const AllEventsPage = async () => {
  const events = await getAllEvents();
  return (
    <>
      <Suspense>
        <AllEvents initialEvents={events.data} />
      </Suspense>
    </>
  );
};

export default AllEventsPage;

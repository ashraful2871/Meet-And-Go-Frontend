import { Button } from "@/components/ui/button";
import { IEvents } from "@/types/event.interface";
import Link from "next/link";
import EventCard from "./EventCard";
import { ArrowRight } from "lucide-react";

export default function FeaturedEvents({ events }: { events: IEvents[] }) {
  // const events = [
  //   {
  //     id: 1,
  //     title: "Weekend Hiking Adventure",
  //     category: "Outdoor",
  //     date: "Dec 15, 2025",
  //     location: "Blue Ridge Mountains",
  //     participants: 8,
  //     maxParticipants: 12,
  //     price: 25,
  //     image:
  //       "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=300&fit=crop",
  //   },
  //   {
  //     id: 2,
  //     title: "Live Jazz Night",
  //     category: "Music",
  //     date: "Dec 20, 2025",
  //     location: "Downtown Jazz Club",
  //     participants: 15,
  //     maxParticipants: 20,
  //     price: 30,
  //     image:
  //       "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=300&fit=crop",
  //   },
  //   {
  //     id: 3,
  //     title: "Board Game Meetup",
  //     category: "Gaming",
  //     date: "Dec 22, 2025",
  //     location: "Cafe Ludus",
  //     participants: 6,
  //     maxParticipants: 10,
  //     price: 0,
  //     image:
  //       "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=500&h=300&fit=crop",
  //   },
  // ];

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              Featured Events
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Discover popular upcoming events happening near you
            </p>
          </div>
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/events">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed">
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground">
                No events available at the moment
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Check back later for exciting events
              </p>
            </div>
          </div>
        )}

        {/* Mobile View All Button */}
        {events.length > 0 && (
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/events">
                View All Events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function FeaturedEvents() {
  const events = [
    {
      id: 1,
      title: "Weekend Hiking Adventure",
      category: "Outdoor",
      date: "Dec 15, 2025",
      location: "Blue Ridge Mountains",
      participants: 8,
      maxParticipants: 12,
      price: 25,
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Live Jazz Night",
      category: "Music",
      date: "Dec 20, 2025",
      location: "Downtown Jazz Club",
      participants: 15,
      maxParticipants: 20,
      price: 30,
      image:
        "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Board Game Meetup",
      category: "Gaming",
      date: "Dec 22, 2025",
      location: "Cafe Ludus",
      participants: 6,
      maxParticipants: 10,
      price: 0,
      image:
        "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=500&h=300&fit=crop",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Featured Events
            </h2>
            <p className="max-w-2xl text-lg text-gray-600">
              Discover popular upcoming events happening near you
            </p>
          </div>
          <Button variant="ghost" className="hidden gap-2 md:flex">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className="group overflow-hidden transition-all hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  width={500}
                  height={300}
                />
                <Badge className="absolute right-3 top-3 bg-white text-gray-900">
                  {event.category}
                </Badge>
              </div>

              <CardContent className="p-5">
                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {event.title}
                </h3>

                {/* Details */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    {event.participants}/{event.maxParticipants} participants
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="text-lg font-bold text-gray-900">
                    {event.price === 0 ? "Free" : `$${event.price}`}
                  </div>
                  <Button size="sm" className="gap-2">
                    Join Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="gap-2">
            View All Events
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

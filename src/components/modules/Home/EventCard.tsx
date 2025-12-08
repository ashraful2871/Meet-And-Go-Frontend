import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Clock,
  Star,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IEvents } from "@/types/event.interface";

// Default fallback image for events
const DEFAULT_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=300&fit=crop";

export default function EventCard({ event }: { event: IEvents }) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "CLOSED":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      case "FULL":
        return "bg-orange-100 text-orange-700 hover:bg-orange-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  // Get host initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Event Image */}
      <Link href={`/events/${event.id}`} className="block">
        <div className="relative h-48 overflow-hidden bg-muted">
          <Image
            src={DEFAULT_EVENT_IMAGE}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Category Badge */}
          <Badge className="absolute left-3 top-3 bg-white/90 text-foreground backdrop-blur-sm hover:bg-white/90">
            {event.eventCategory.name}
          </Badge>

          {/* Status Badge */}
          <Badge
            className={`absolute right-3 top-3 ${getStatusColor(event.status)}`}
          >
            {event.status}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-5">
        {/* Event Title */}
        <Link href={`/events/${event.id}`}>
          <h3 className="mb-3 line-clamp-2 text-lg font-bold transition-colors hover:text-primary">
            {event.name}
          </h3>
        </Link>

        {/* Host Info */}
        <div className="mb-4 flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={event.host.profilePhoto || undefined} />
            <AvatarFallback className="text-xs">
              {getInitials(event.host.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              {event.host.name}
            </span>
            {event.host.isVerified && (
              <CheckCircle2 className="h-3 w-3 text-primary" />
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="mb-4 space-y-2">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span className="truncate">{formatDate(event.date)}</span>
            <Clock className="ml-1 h-4 w-4 shrink-0" />
            <span>{event.time}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {event.city}, {event.country}
            </span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 shrink-0" />
            <span>
              {event.minParticipants}-{event.maxParticipants} participants
            </span>
          </div>

          {/* Rating (if available) */}
          {event.host.reviewCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">
                {event.host.rating.toFixed(1)}
              </span>
              <span>({event.host.reviewCount} reviews)</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Joining Fee</span>
            <span className="text-xl font-bold">
              {event.joiningFee === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                `$${event.joiningFee}`
              )}
            </span>
          </div>
          <Button size="sm" className="gap-2" asChild>
            <Link href={`/events/${event.id}`}>
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Star,
  CheckCircle2,
  Share2,
  Heart,
  MapPinned,
  Mail,
  Phone,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  User,
  Award,
} from "lucide-react";
import Image from "next/image";
import { IEvents } from "@/types/event.interface";
import { useState } from "react";

interface EventDetailsContentProps {
  event: IEvents;
}

const DEFAULT_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&h=1080&fit=crop&q=80";

const EventDetailsContent = ({ event }: EventDetailsContentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      OPEN: { label: "Open", color: "bg-green-100 text-green-700" },
      CLOSED: { label: "Closed", color: "bg-red-100 text-red-700" },
      FULL: { label: "Full", color: "bg-orange-100 text-orange-700" },
      COMPLETED: { label: "Completed", color: "bg-blue-100 text-blue-700" },
      CANCELLED: { label: "Cancelled", color: "bg-gray-100 text-gray-700" },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.OPEN
    );
  };

  // Get host initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const status = getStatusBadge(event.status);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image Section */}
      <div className="relative h-[400px] w-full overflow-hidden bg-muted md:h-[500px]">
        <Image
          src={DEFAULT_EVENT_IMAGE}
          alt={event.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Floating Action Buttons */}
        <div className="absolute right-4 top-4 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`h-5 w-5 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Event Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge className="text-sm" variant="secondary">
            {event.eventCategory.name}
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            {/* Title and Status */}
            <div className="mb-6">
              <div className="mb-3 flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold md:text-4xl">{event.name}</h1>
                <Badge className={status.color}>{status.label}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {event.city}, {event.country}
                  </span>
                </div>
                {event.host.reviewCount > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">
                      {event.host.rating.toFixed(1)}
                    </span>
                    <span>({event.host.reviewCount} reviews)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Key Details Cards */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-semibold">{formatDate(event.date)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="font-semibold">{event.time}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Participants
                    </p>
                    <p className="font-semibold">
                      {event.minParticipants}-{event.maxParticipants}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fee</p>
                    <p className="font-semibold">
                      {event.joiningFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${event.joiningFee}`
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPinned className="h-5 w-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.city}, {event.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            {event.reviews && event.reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Reviews ({event.reviews.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {event.reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      <Separator />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6 lg:sticky lg:top-4 lg:self-start">
            {/* Booking Card */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <div className="mb-2 text-4xl font-bold">
                    {event.joiningFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <>${event.joiningFee}</>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>

                <div className="mb-6 space-y-3 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Booking Deadline
                    </span>
                    <span className="font-medium">
                      {event.eventBookingDeadline}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Spots Available
                    </span>
                    <span className="font-medium">
                      {event.maxParticipants - event.minParticipants} left
                    </span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Join This Event
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  You won&apos;t be charged yet
                </p>
              </CardContent>
            </Card>

            {/* Host Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Hosted By
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Host Profile */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={event.host.profilePhoto || undefined} />
                    <AvatarFallback className="text-lg">
                      {getInitials(event.host.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-semibold">{event.host.name}</h3>
                      {event.host.isVerified && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.host.city}, {event.host.country}
                    </p>
                  </div>
                </div>

                {/* Host Stats */}
                <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4">
                  <div>
                    <p className="text-2xl font-bold">
                      {event.host.totalEventsHosted}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Events Hosted
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-2xl font-bold">{event.host.rating}</p>
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {event.host.reviewCount} Reviews
                    </p>
                  </div>
                </div>

                {/* Host Bio */}
                {event.host.bio && (
                  <div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {event.host.bio}
                    </p>
                  </div>
                )}

                {/* Host Expertise */}
                {event.host.experience && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Experience:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.host.experience}
                    </p>
                  </div>
                )}

                {/* Specialties */}
                {event.host.specialties && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {event.host.specialties
                        .split(",")
                        .map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty.trim()}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Contact Information */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Contact Host</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{event.host.email}</span>
                    </div>
                    {event.host.contactNumber && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{event.host.contactNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                {(event.host.websiteUrl ||
                  event.host.facebookUrl ||
                  event.host.instagramUrl ||
                  event.host.linkedinUrl) && (
                  <>
                    <Separator />
                    <div className="flex gap-2">
                      {event.host.websiteUrl && (
                        <Button size="icon" variant="outline" asChild>
                          <a
                            href={event.host.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {event.host.facebookUrl && (
                        <Button size="icon" variant="outline" asChild>
                          <a
                            href={event.host.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Facebook className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {event.host.instagramUrl && (
                        <Button size="icon" variant="outline" asChild>
                          <a
                            href={event.host.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Instagram className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {event.host.linkedinUrl && (
                        <Button size="icon" variant="outline" asChild>
                          <a
                            href={event.host.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </>
                )}

                <Button variant="outline" className="w-full">
                  Message Host
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsContent;

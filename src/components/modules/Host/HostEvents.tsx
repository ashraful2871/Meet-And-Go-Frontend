/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Star,
  Clock,
} from "lucide-react";
import Image from "next/image";

interface Event {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  city: string;
  country: string;
  minParticipants: number;
  maxParticipants: number;
  joiningFee: number;
  status: "OPEN" | "CLOSED" | "COMPLETED" | "CANCELLED";
  eventCategory: {
    id: string;
    name: string;
  };
  host: {
    name: string;
    rating: number;
    reviewCount: number;
  };
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface HostEventsProps {
  events: Event[];
}

const HostEvents = ({ events }: HostEventsProps) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Event>>({});

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      OPEN: "bg-green-100 text-green-700",
      CLOSED: "bg-red-100 text-red-700",
      COMPLETED: "bg-blue-100 text-blue-700",
      CANCELLED: "bg-gray-100 text-gray-700",
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.OPEN
    );
  };

  // Handle view
  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  // Handle edit
  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setEditFormData({
      name: event.name,
      type: event.type,
      description: event.description,
      image: event.image,
      date: event.date.split("T")[0],
      time: event.time,
      location: event.location,
      city: event.city,
      country: event.country,
      minParticipants: event.minParticipants,
      maxParticipants: event.maxParticipants,
      joiningFee: event.joiningFee,
      status: event.status,
    });
    setEditModalOpen(true);
  };

  // Handle delete
  const handleDelete = (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      console.log("Delete event:", eventId);
      // TODO: Implement delete logic
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Events</CardTitle>
          <CardDescription>Manage all your hosted events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No events found. Create your first event!
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        {event.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {event.eventCategory.name}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(event.date)}</TableCell>
                      <TableCell>
                        {event.city}, {event.country}
                      </TableCell>
                      <TableCell>
                        {event.minParticipants} - {event.maxParticipants}
                      </TableCell>
                      <TableCell>
                        {event.joiningFee === 0 ? (
                          <span className="text-green-600 font-medium">
                            Free
                          </span>
                        ) : (
                          `$${event.joiningFee}`
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(event.status)}>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleView(event)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(event)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(event.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>
              Complete information about this event
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-6">
              {/* Event Image */}
              {selectedEvent.image && (
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    height={400}
                    width={800}
                    src={selectedEvent.image}
                    alt={selectedEvent.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/800x400?text=Event+Image";
                    }}
                  />
                </div>
              )}

              {/* Basic Info */}
              <div>
                <h3 className="mb-2 text-2xl font-bold">
                  {selectedEvent.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusBadge(selectedEvent.status)}>
                    {selectedEvent.status}
                  </Badge>
                  <Badge variant="secondary">
                    {selectedEvent.eventCategory.name}
                  </Badge>
                  <Badge variant="outline">{selectedEvent.type}</Badge>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h4 className="mb-2 font-semibold">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Date & Time */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Event Date</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(selectedEvent.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Event Time</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h4 className="mb-3 font-semibold">Location</h4>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {selectedEvent.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.city}, {selectedEvent.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Participants & Fee */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Participants</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.minParticipants} -{" "}
                      {selectedEvent.maxParticipants} people
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Joining Fee</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.joiningFee === 0 ? (
                        <span className="font-semibold text-green-600">
                          Free Event
                        </span>
                      ) : (
                        `$${selectedEvent.joiningFee} per person`
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              {selectedEvent.reviews.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="mb-3 font-semibold">
                      Reviews ({selectedEvent.reviews.length})
                    </h4>
                    <div className="space-y-3">
                      {selectedEvent.reviews.map((review) => (
                        <div key={review.id} className="rounded-lg border p-3">
                          <div className="mb-2 flex items-center gap-2">
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
                            <span className="text-xs text-muted-foreground">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Metadata */}
              <Separator />
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">
                    {formatDate(selectedEvent.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">
                    {formatDate(selectedEvent.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update your event information (Preview only - no save action)
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Event Name</Label>
                    <Input
                      id="edit-name"
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="edit-type">Event Type</Label>
                      <Input
                        id="edit-type"
                        value={editFormData.type}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            type: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-status">Status</Label>
                      <Select
                        value={editFormData.status}
                        onValueChange={(value) =>
                          setEditFormData({
                            ...editFormData,
                            status: value as any,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OPEN">Open</SelectItem>
                          <SelectItem value="CLOSED">Closed</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={editFormData.description}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          description: e.target.value,
                        })
                      }
                      className="min-h-24"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-image">Image URL</Label>
                    <Input
                      id="edit-image"
                      value={editFormData.image}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          image: e.target.value,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="edit-date">Event Date</Label>
                      <Input
                        id="edit-date"
                        type="date"
                        value={editFormData.date}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-time">Event Time</Label>
                      <Input
                        id="edit-time"
                        type="time"
                        value={editFormData.time}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            time: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-location">Specific Location</Label>
                    <Input
                      id="edit-location"
                      value={editFormData.location}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="edit-city">City</Label>
                      <Input
                        id="edit-city"
                        value={editFormData.city}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-country">Country</Label>
                      <Input
                        id="edit-country"
                        value={editFormData.country}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            country: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participants & Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Participants & Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="edit-min">Minimum Participants</Label>
                      <Input
                        id="edit-min"
                        type="number"
                        value={editFormData.minParticipants}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            minParticipants: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-max">Maximum Participants</Label>
                      <Input
                        id="edit-max"
                        type="number"
                        value={editFormData.maxParticipants}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            maxParticipants: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-fee">Joining Fee ($)</Label>
                    <Input
                      id="edit-fee"
                      type="number"
                      step="0.01"
                      value={editFormData.joiningFee}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          joiningFee: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("Save changes:", editFormData);
                    // TODO: Implement save logic
                    setEditModalOpen(false);
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HostEvents;

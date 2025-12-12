"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Image as ImageIcon,
  FileText,
  Tag,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/service/host/create-event";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface CreateEventFormProps {
  categories: Category[];
}

const CreateEventForm = ({ categories }: CreateEventFormProps) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createEvent, null);
  console.log(state);

  useEffect(() => {
    if (state && state.success) {
      toast.success(state.message || "Event created successfully");
    }
  }, [state]);
  return (
    <form action={formAction} className="space-y-8">
      {/* Error Alert */}
      {state && !state.success && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {/* Basic Information Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Enter the essential details about your event
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Event Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Event Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Mountain Hiking Adventure Tour"
              required
              disabled={isPending}
            />
          </div>

          {/* Event Type and Category */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">
                Event Type <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="type"
                  name="type"
                  placeholder="e.g., Hiking, Music, Sports"
                  className="pl-10"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select name="categoryId" required disabled={isPending}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your event in detail..."
              className="min-h-32 resize-none"
              required
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Provide a detailed description of what participants can expect
            </p>
          </div>

          {/* Event Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Event Image URL</Label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/event-image.jpg"
                className="pl-10"
                disabled={isPending}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Optional: Add an image URL for your event banner
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Date & Time Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Date & Time
          </CardTitle>
          <CardDescription>When will your event take place?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Event Date */}
            <div className="space-y-2">
              <Label htmlFor="date">
                Event Date <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="date"
                  name="date"
                  type="date"
                  className="pl-10"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Event Time */}
            <div className="space-y-2">
              <Label htmlFor="time">
                Event Time <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="time"
                  name="time"
                  type="time"
                  className="pl-10"
                  required
                  disabled={isPending}
                />
              </div>
            </div>
          </div>

          {/* Booking Deadline */}
          <div className="space-y-2">
            <Label htmlFor="eventBookingDeadline">
              Booking Deadline <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="eventBookingDeadline"
                name="eventBookingDeadline"
                type="datetime-local"
                className="pl-10"
                required
                disabled={isPending}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Last date and time for participants to register
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Location Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location
          </CardTitle>
          <CardDescription>Where will this event take place?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Specific Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              Specific Location <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="location"
                name="location"
                placeholder="e.g., Everest Base Camp Trail"
                className="pl-10"
                required
                disabled={isPending}
              />
            </div>
          </div>

          {/* City and Country */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-destructive">*</span>
              </Label>
              <Input
                id="city"
                name="city"
                placeholder="e.g., Kathmandu"
                required
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">
                Country <span className="text-destructive">*</span>
              </Label>
              <Input
                id="country"
                name="country"
                placeholder="e.g., Nepal"
                required
                disabled={isPending}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participants & Pricing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participants & Pricing
          </CardTitle>
          <CardDescription>
            Set the capacity and pricing for your event
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Participants */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="minParticipants">
                Minimum Participants <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="minParticipants"
                  name="minParticipants"
                  type="number"
                  min="1"
                  placeholder="e.g., 5"
                  className="pl-10"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants">
                Maximum Participants <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="maxParticipants"
                  name="maxParticipants"
                  type="number"
                  min="1"
                  placeholder="e.g., 20"
                  className="pl-10"
                  required
                  disabled={isPending}
                />
              </div>
            </div>
          </div>

          {/* Joining Fee */}
          <div className="space-y-2">
            <Label htmlFor="joiningFee">
              Joining Fee ($) <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="joiningFee"
                name="joiningFee"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="pl-10"
                required
                disabled={isPending}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter 0 for free events
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating Event..." : "Create Event"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEventForm;

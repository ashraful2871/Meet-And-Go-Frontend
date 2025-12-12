import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const EventDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image Skeleton */}
      <div className="relative h-[400px] w-full overflow-hidden bg-muted md:h-[500px]">
        <Skeleton className="h-full w-full" />

        {/* Floating Action Buttons Skeleton */}
        <div className="absolute right-4 top-4 flex gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        {/* Event Badge Skeleton */}
        <div className="absolute bottom-4 left-4">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            {/* Title and Status Skeleton */}
            <div className="mb-6">
              <div className="mb-3 flex items-start justify-between gap-4">
                <Skeleton className="h-10 flex-1 md:h-12" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Key Details Cards Skeleton */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Description Skeleton */}
            <Card className="mb-8">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>

            {/* Location Details Skeleton */}
            <Card className="mb-8">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    {i < 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6 lg:sticky lg:top-4 lg:self-start">
            {/* Booking Card Skeleton */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <Skeleton className="mx-auto mb-2 h-12 w-32" />
                  <Skeleton className="mx-auto h-4 w-24" />
                </div>

                <div className="mb-6 space-y-3 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>

                <Skeleton className="h-11 w-full" />

                <Skeleton className="mx-auto mt-4 h-3 w-40" />
              </CardContent>
            </Card>

            {/* Host Information Card Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Host Profile Skeleton */}
                <div className="flex items-start gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                {/* Host Stats Skeleton */}
                <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-12" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>

                {/* Host Bio Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Host Expertise Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-full" />
                </div>

                {/* Specialties Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>

                <Separator />

                {/* Contact Information Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>

                {/* Social Links Skeleton */}
                <Separator />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-10 w-10" />
                </div>

                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsSkeleton;

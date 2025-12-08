import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function EventsPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto mb-4 h-12 w-3/4" />
            <Skeleton className="mx-auto h-6 w-2/3" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters Skeleton */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <Skeleton className="h-11 flex-1" />
            <Skeleton className="h-11 w-full md:w-[220px]" />
          </div>
          <div className="hidden gap-3 md:flex">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Results Summary Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-5 w-48" />
        </div>

        {/* Events Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-5">
                <Skeleton className="mb-3 h-6 w-full" />
                <Skeleton className="mb-4 h-4 w-24" />
                <div className="mb-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

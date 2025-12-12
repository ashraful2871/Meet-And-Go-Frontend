import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const EventsTableSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsTableSkeleton;

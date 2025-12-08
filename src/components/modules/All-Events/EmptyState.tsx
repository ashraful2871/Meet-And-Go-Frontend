"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function EmptyState({
  hasActiveFilters,
  onClearFilters,
}: {
  hasActiveFilters?: boolean | string;
  onClearFilters: () => void;
}) {
  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Search className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">No events found</h3>
        <p className="mb-6 text-muted-foreground">
          {hasActiveFilters
            ? "Try adjusting your filters or search criteria"
            : "There are no events available at the moment"}
        </p>
        {hasActiveFilters && (
          <Button onClick={onClearFilters} variant="outline">
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
}
export default EmptyState;

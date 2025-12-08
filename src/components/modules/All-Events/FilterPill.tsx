"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

function FilterPill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <Badge variant="secondary" className="gap-1.5 pl-3 pr-1">
      <span className="text-xs">{label}</span>
      <button
        onClick={onRemove}
        className="rounded-full p-0.5 hover:bg-muted-foreground/20"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}
export default FilterPill;

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown } from "lucide-react";

function DesktopFilterDropdown({
  label,
  items,
  selectedItems,
  onToggle,
}: {
  label: string;
  items: string[] | undefined;
  selectedItems: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          {label}
          {selectedItems.length > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 px-1.5">
              {selectedItems.length}
            </Badge>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-auto">
        <div className="mx-auto max-w-3xl space-y-4 py-6">
          <h3 className="font-semibold">{label}</h3>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items?.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Checkbox
                  id={`${label}-${item}`}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => onToggle(item)}
                />
                <label
                  htmlFor={`${label}-${item}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default DesktopFilterDropdown;

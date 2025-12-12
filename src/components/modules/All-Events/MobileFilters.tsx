"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/* eslint-disable @typescript-eslint/no-explicit-any */
function MobileFilters({
  categories,
  cities,
  selectedCategories,
  toggleCategory,
  selectedCities,
  toggleCity,
  selectedStatus,
  toggleStatus,
  priceFilter,
  setPriceFilter,
}: any) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Categories</Label>
        <Separator />
        <div className="space-y-3">
          {categories.map((category: any) => (
            <div key={category.id} className="flex items-center gap-3">
              <Checkbox
                id={`cat-mobile-${category.id}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => toggleCategory(category.name)}
              />
              <label
                htmlFor={`cat-mobile-${category.id}`}
                className="text-sm font-medium leading-none"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Locations</Label>
        <Separator />
        <div className="space-y-3">
          {cities.map((city: string) => (
            <div key={city} className="flex items-center gap-3">
              <Checkbox
                id={`city-mobile-${city}`}
                checked={selectedCities.includes(city)}
                onCheckedChange={() => toggleCity(city)}
              />
              <label
                htmlFor={`city-mobile-${city}`}
                className="text-sm font-medium leading-none"
              >
                {city}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Status</Label>
        <Separator />
        <div className="space-y-3">
          {["OPEN", "CLOSED", "FULL"].map((status) => (
            <div key={status} className="flex items-center gap-3">
              <Checkbox
                id={`status-mobile-${status}`}
                checked={selectedStatus.includes(status)}
                onCheckedChange={() => toggleStatus(status)}
              />
              <label
                htmlFor={`status-mobile-${status}`}
                className="text-sm font-medium leading-none"
              >
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Price</Label>
        <Separator />
        <div className="space-y-3">
          {[
            { value: "all", label: "All Prices" },
            { value: "free", label: "Free Only" },
            { value: "paid", label: "Paid Only" },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <Checkbox
                id={`price-mobile-${option.value}`}
                checked={priceFilter === option.value}
                onCheckedChange={() => setPriceFilter(option.value)}
              />
              <label
                htmlFor={`price-mobile-${option.value}`}
                className="text-sm font-medium leading-none"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MobileFilters;

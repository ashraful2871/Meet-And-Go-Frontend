/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import EmptyState from "./EmptyState";
import EventCard from "../Home/EventCard";
import FilterPill from "./FilterPill";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DesktopFilterDropdown from "./DesktopFilterDropdown";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileFilters from "./MobileFilters";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AllEventsProps {
  initialEvents: any[];
  categories?: any[];
  cities?: string[];
  searchParams?: { [key: string]: string | string[] | undefined };
}
const AllEvents = ({
  initialEvents,
  categories,
  cities,
  searchParams,
}: AllEventsProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
        <div className="container relative mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Discover Amazing Events
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Find and join events that match your interests. From outdoor
              adventures to cultural experiences.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters Section */}
        <div className="mb-8 space-y-4">
          {/* Main Search Bar */}
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by event name, location, or category..."
                className="h-11 pl-10 pr-10"
              />
            </div>

            {/* Mobile Filter Button */}
            {/* <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 md:hidden">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    <SheetHeader className="mb-6">
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your search to find the perfect event
                      </SheetDescription>
                    </SheetHeader>

                    <MobileFilters
                      categories={categories}
                      cities={cities}
                      selectedCategories={selectedCategories}
                      toggleCategory={toggleCategory}
                      selectedCities={selectedCities}
                      toggleCity={toggleCity}
                      selectedStatus={selectedStatus}
                      toggleStatus={toggleStatus}
                      priceFilter={priceFilter}
                      setPriceFilter={setPriceFilter}
                    />

                    <div className="mt-6 space-y-3">
                      <SheetClose asChild>
                        <Button className="w-full">Apply Filters</Button>
                      </SheetClose>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={clearAllFilters}
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet> */}

            {/* Sort Dropdown */}
            <Select>
              <SelectTrigger className="h-11 w-full md:w-[220px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date: Soonest First</SelectItem>
                <SelectItem value="date-desc">Date: Latest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        {/* <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredEvents.length}
              </span>{" "}
              {filteredEvents.length === 1 ? "event" : "events"}
              {initialEvents.length !== filteredEvents.length && (
                <>
                  {" "}
                  of{" "}
                  <span className="font-semibold text-foreground">
                    {initialEvents.length}
                  </span>{" "}
                  total
                </>
              )}
            </p>
          </div>
        </div> */}

        {/* Events Grid */}
        {initialEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {initialEvents?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState hasActiveFilters={"true"} onClearFilters={() => {}} />
        )}
      </div>
    </div>
  );
};

export default AllEvents;

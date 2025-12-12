import { Suspense } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAllEventsCategory } from "@/service/category/fetch-category";
import CreateEventForm from "@/components/modules/Host/CreateEvent";
import CreateEventSkeleton from "@/components/modules/Dashboard/CreateEventSkeleton";

const CreateEventPage = async () => {
  // Fetch categories
  const categoriesResponse = await getAllEventsCategory();

  // Handle error
  if (!categoriesResponse.success) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">
              Create New Event
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below to create an amazing event
            </p>
          </div>

          {/* Error Alert */}
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Categories</AlertTitle>
            <AlertDescription>
              {categoriesResponse.message || "Failed to load event categories"}
              <br />
              <span className="text-sm">
                Please try again later or contact support if the problem
                persists.
              </span>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const categories = categoriesResponse.data || [];

  // Handle empty categories
  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">
              Create New Event
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below to create an amazing event
            </p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Categories Available</AlertTitle>
            <AlertDescription>
              There are no event categories available at the moment. Please
              contact an administrator to add categories before creating events.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            Create New Event
          </h1>
          <p className="text-muted-foreground">
            Fill in the details below to create an amazing event for your
            community
          </p>
        </div>

        {/* Form */}
        <Suspense fallback={<CreateEventSkeleton />}>
          <CreateEventForm categories={categories} />
        </Suspense>
      </div>
    </div>
  );
};

export default CreateEventPage;

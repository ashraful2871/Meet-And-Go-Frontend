import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";
import { CategoryPageClient } from "@/components/modules/Dashboard/Admin/Categorypageclient";
import { getAllEventsCategory } from "@/service/category/fetch-category";
import CategoryTable from "@/components/modules/Dashboard/Admin/Categorytable";
import CategoryPageSkeleton from "@/components/modules/Dashboard/Admin/CategoryPageSkeleton";

const CategoryPage = async () => {
  const response = await getAllEventsCategory();

  // Handle error
  if (!response.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">
              Category Management
            </h1>
            <p className="mt-2 text-muted-foreground">
              Organize events with categories
            </p>
          </div>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Categories</AlertTitle>
          <AlertDescription>
            {response.message || "Failed to load categories"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const categories = response.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">
            Category Management
          </h1>
          <p className="mt-2 text-muted-foreground">
            Organize and manage event categories
          </p>
        </div>
        <CategoryPageClient initialCategories={categories} />
      </div>

      {/* Categories Table */}
      <Suspense fallback={<CategoryPageSkeleton />}>
        <CategoryTable categories={categories} />
      </Suspense>
    </div>
  );
};

export default CategoryPage;

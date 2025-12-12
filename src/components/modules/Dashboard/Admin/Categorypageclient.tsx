/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import CreateCategoryForm from "./CreateCategoryForm";

interface CategoryPageClientProps {
  initialCategories: any[];
}

export function CategoryPageClient({
  initialCategories,
}: CategoryPageClientProps) {
  const router = useRouter();

  const handleSuccess = () => {
    // Refresh the page to show new category
    router.refresh();
  };

  return <CreateCategoryForm onSuccess={handleSuccess} />;
}

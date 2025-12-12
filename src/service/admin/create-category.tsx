import { serverFetch } from "@/lib/server-fetch";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createCategory = async (
  _currentState: any,
  formData: FormData
): Promise<any> => {
  try {
    // Extract category name from FormData
    const payload = {
      name: formData.get("name") as string,
    };

    // Validate required field
    if (!payload.name || payload.name.trim() === "") {
      return {
        success: false,
        message: "Category name is required",
      };
    }

    // Validate name length
    if (payload.name.length < 2) {
      return {
        success: false,
        message: "Category name must be at least 2 characters long",
      };
    }

    if (payload.name.length > 50) {
      return {
        success: false,
        message: "Category name must be less than 50 characters",
      };
    }

    // Call backend API
    const res = await serverFetch.post("/category/create", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to create category");
    }

    return {
      success: true,
      message: result.message || "Category created successfully",
      data: result.data,
    };
  } catch (error: any) {
    // Handle Next.js redirect
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error creating category:", error);

    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create category. Please try again."
      }`,
    };
  }
};

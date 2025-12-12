/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const createEvent = async (
  _currentState: any,
  formData: FormData
): Promise<any> => {
  try {
    // Extract and prepare data from FormData
    const payload = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      categoryId: formData.get("categoryId") as string,
      description: formData.get("description") as string,
      image: (formData.get("image") as string) || null,
      eventBookingDeadline: new Date(
        formData.get("eventBookingDeadline") as string
      ).toISOString(),
      date: new Date(formData.get("date") as string).toISOString(),
      time: formData.get("time") as string,
      location: formData.get("location") as string,
      city: formData.get("city") as string,
      country: formData.get("country") as string,
      minParticipants: parseInt(formData.get("minParticipants") as string),
      maxParticipants: parseInt(formData.get("maxParticipants") as string),
      joiningFee: parseFloat(formData.get("joiningFee") as string),
    };

    // Validate required fields
    if (!payload.name || !payload.categoryId || !payload.date) {
      return {
        success: false,
        message: "Please fill in all required fields",
      };
    }

    // Validate participants
    if (payload.minParticipants > payload.maxParticipants) {
      return {
        success: false,
        message:
          "Minimum participants cannot be greater than maximum participants",
      };
    }

    // Call backend API
    const res = await serverFetch.post("/event/create-event", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to create event");
    }

    return result;
  } catch (error: any) {
    // Handle Next.js redirect
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error creating event:", error);

    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create event. Please try again."
      }`,
    };
  }
};

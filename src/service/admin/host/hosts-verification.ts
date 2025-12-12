/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const hostsVerification = async (
  hostId: string,
  formData: FormData
): Promise<any> => {
  try {
    // Extract status and optional rejection reason
    const status = formData.get("status") as string;
    const rejectionReason = formData.get("rejectionReason") as string | null;

    // Validate required fields
    if (!status) {
      return {
        success: false,
        message: "Status is required",
      };
    }

    // Validate status value
    if (!["APPROVED", "REJECTED"].includes(status)) {
      return {
        success: false,
        message: "Invalid status value",
      };
    }

    // If rejected, rejection reason is required
    if (
      status === "REJECTED" &&
      (!rejectionReason || rejectionReason.trim() === "")
    ) {
      return {
        success: false,
        message: "Rejection reason is required when rejecting a host",
      };
    }

    // Prepare payload
    const payload: any = {
      status,
    };

    // Add rejection reason if status is REJECTED
    if (status === "REJECTED" && rejectionReason) {
      payload.rejectionReason = rejectionReason.trim();
    }

    // Call backend API
    const res = await serverFetch.patch(`/user/host-verification/${hostId}`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(
        result.message || "Failed to update host verification status"
      );
    }

    return {
      success: true,
      message: result.message || `Host ${status.toLowerCase()} successfully`,
      data: result.data,
    };
  } catch (error: any) {
    // Handle Next.js redirect
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error updating host verification:", error);

    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update host verification. Please try again."
      }`,
    };
  }
};

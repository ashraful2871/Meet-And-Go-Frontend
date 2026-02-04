/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function changePassword(
  _currentState: any,
  formData: FormData
): Promise<any> {
  try {
    // Extract passwords from FormData
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Client-side validation backup
    if (!oldPassword || !newPassword || !confirmPassword) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      return {
        success: false,
        message: "New passwords do not match",
      };
    }

    // Check password length
    if (newPassword.length < 6) {
      return {
        success: false,
        message: "New password must be at least 6 characters long",
      };
    }

    // Check if old and new password are the same
    if (oldPassword === newPassword) {
      return {
        success: false,
        message: "New password must be different from old password",
      };
    }

    // Prepare payload
    const payload = {
      oldPassword,
      newPassword,
    };

    // Call backend API
    const response = await serverFetch.post("/auth/change-password", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to change password");
    }

    return {
      success: true,
      message: result.message || "Password changed successfully",
    };
  } catch (error: any) {
    // Handle Next.js redirect
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error changing password:", error);

    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to change password. Please try again."
      }`,
    };
  }
}

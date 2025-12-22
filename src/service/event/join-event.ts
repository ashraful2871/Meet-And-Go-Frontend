"use server";
import { serverFetch } from "@/lib/server-fetch";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function joinEvent(eventId: string) {
  try {
    const response = await serverFetch.post(
      `/event-participant/join/${eventId}`
    );

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

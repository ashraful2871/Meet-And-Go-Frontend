/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parse } from "cookie";
import { setCookie } from "./cookiesHandler";
import { JwtPayload } from "jsonwebtoken";
export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    const setCookieHeaders = res.headers.getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);
        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie headers found");
    }
    if (!accessTokenObject) {
      throw new Error("Access token cookie not found");
    }
    if (!refreshTokenObject) {
      throw new Error("Refresh token cookie not found");
    }

    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject[" Max-Age"]) || 1000 * 60 * 60, // 1 hour
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject.SameSite || "none",
    });

    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject[" Max-Age"]) || 1000 * 60 * 60 * 24 * 90, // 90 days
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject.SameSite || "none",
    });
  } catch (error) {
    console.log(error);
  }
};

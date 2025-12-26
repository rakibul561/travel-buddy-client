/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parse } from "cookie";
import { cookies } from "next/headers";

export const loginUser = async (
  _currentState: any,
  formData: FormData
): Promise<any> => {
  try {
     let accessTokenObject:null | any = null;
     let refreshTokenObject:null | any = null;
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
        body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    const setCookieHeaders = res.headers.getSetCookie();
    console.log(setCookieHeaders, "setCookie");

    if(setCookieHeaders && setCookieHeaders.length > 0) {

      setCookieHeaders.forEach((cookie:string) => {
        console.log(cookie, "for each cookie");
        const parsedCookie = parse(cookie);
        console.log(parsedCookie, "parsed cookie");

        if(parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie
        }
        if(parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie

        }

      }); 



    } else {
      throw new Error("no set cookie found.");
    }

     console.log({
      accessTokenObject,
      refreshTokenObject
     })

     if(!accessTokenObject) {
      throw new Error("Access Tokens not found token");
     }

     if(!refreshTokenObject) {
      throw new Error("Refresh Tokens not found token");
     }


     const cookieStore = await cookies();

        cookieStore.set("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 3600,
            path: accessTokenObject.Path || "/",
            sameSite: (accessTokenObject['SameSite'] as any) || "none",
        });

        cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 7776000,
            path: refreshTokenObject.Path || "/",
            sameSite: (refreshTokenObject['SameSite'] as any) || "none",
        });






    console.log({
        res, result
    })

    return result; 
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Login failed. Please try again.",
    };
  }
};

require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// parse environment variables to integers with fallback values
const accessTokenExpiresTime = parseInt(
  process.env.ACCESS_TOKEN_EXPIRES || "300",
  10
);
const refreshTokenExpiresTime = parseInt(
  process.env.REFRESH_TOKEN_EXPIRES || "1200",
  10
);

//options for cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpiresTime * 60 * 60 * 1000),
  maxAge: accessTokenExpiresTime * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpiresTime * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpiresTime * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = async (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // upload session to redis
  // try {
  //   await redis.set(user.id, JSON.stringify(user), "EX", 3600); // 1 hour expiry
  // } catch (error) {
  //   console.error("❌ Error saving session to Redis:", error);
  // }

  if (!redis.status || redis.status !== "ready") {
    console.error("❌ Redis is not connected. Skipping session storage.");
  } else {
    try {
      await redis.set(user.id, JSON.stringify(user), "EX", 3600); // Set user session with 1-hour expiry
    } catch (error) {
      console.error("❌ Error saving session to Redis:", error);
    }
  }

  // only set secure to true in production

  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
    // refreshToken
  });
};

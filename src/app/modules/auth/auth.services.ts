import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { AppError } from "../../errors/globalError";
import {
  generateAccessToken,
  generateOtp,
  generateRefreshToken,
  hashPassword,
  sendOtpEmail,
} from "../../lib/utils";
import { IUser, Role } from "../user/user.interface";
import User from "../user/user.model";

const registerUserIntoDB = async (user: IUser) => {
  const { name, email, password, gender, role } = user;

  // Start a Mongoose session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new AppError("User already exists", httpStatus.CONFLICT);
    }

    // Generate OTP and set expiration
    const otp = generateOtp();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    const hashedPassword = await hashPassword(password); // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Ensure you hash the password before saving
      gender,
      otp,
      otpExpiration,
      isVerified: false,
      role: Role.Admin,
    });

    // Save the new user within the transaction
    await newUser.save({ session });

    // Send OTP to user's email
    await sendOtpEmail(newUser?.email, otp, newUser.name);

    // Commit the transaction
    await session.commitTransaction();
    return "User registered. Please verify your email.";
  } catch (error) {
    console.log("err", error);
    // Abort the transaction in case of an error
    await session.abortTransaction();
    if (error instanceof AppError) {
      throw error; // Re-throw custom AppError
    } else {
      // Throw a generic AppError for unexpected errors
      throw new AppError(
        "An unexpected error occurred",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
  } finally {
    // End the session
    session.endSession();
  }
};
const verifyOtpIntoDB = async (email: string, otp: string) => {
  // Find user by email
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  // Check if OTP is valid
  if (user.otp !== otp) {
    throw new AppError("Invalid OTP", httpStatus.BAD_REQUEST);
  }

  // Check if OTP has expired
  if (!user.otpExpiration || user.otpExpiration < new Date()) {
    throw new AppError("'OTP has expired", httpStatus.BAD_REQUEST);
  }

  // Update user's isVerified status
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiration = undefined;
  await user.save();
  const accessToken = generateAccessToken(
    (user as any)?._id.toString(),
    user.role
  );
  const refreshToken = await generateRefreshToken((user as any)?._id);
  return {
    accessToken,
    refreshToken,
    user: user.toJSON(),
  };
};

const loginUserIntoDB = async (email: string, password: string) => {
  // Find user by email
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  // Check if user is verified
  if (!user.isVerified) {
    // Delete the unverified user
    await User.deleteOne({ email });
    throw new AppError(
      "Email not verified. User has been removed.",
      httpStatus.UNAUTHORIZED
    );
  }
  console.log("user.password", user.password);
  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", httpStatus.UNAUTHORIZED);
  }
  // Generate tokens after login
  const accessToken = generateAccessToken((user as any)?._id, user?.role);
  const refreshToken = await generateRefreshToken((user as any)?._id);

  // Return user without password
  const { password: _, ...userWithoutPassword } = user.toObject();
  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  };
};
const refreshAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 400);
  }

  let decoded;
  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as string
    );
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const { userId } = decoded as jwt.JwtPayload;
  const user = await User.findById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  // Generate new access token
  const newAccessToken = generateAccessToken((user as any)?._id, user.role);
  return {
    user: user.toObject(),
    accessToken: newAccessToken,
  };
};
const logoutUserFromDB = async (userId: string) => {
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", httpStatus.NOT_FOUND);
    }

    // Invalidate the refresh token by removing it
    user.refreshToken = "";
    await user.save({ validateBeforeSave: true });

    return "User logged out successfully";
  } catch (error) {
    console.error("Logout error:", error);
    if (error instanceof AppError) {
      throw error; // Re-throw custom AppError
    }
    throw new AppError(
      "An unexpected error occurred during logout",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
export const AuthServices = {
  registerUserIntoDB,
  verifyOtpIntoDB,
  loginUserIntoDB,
  refreshAccessToken,
  logoutUserFromDB,
};

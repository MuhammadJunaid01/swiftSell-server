import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { AppError } from "../../errors/globalError";
import { StatusCodes } from "../../lib/statusCode";
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
  const {
    name,
    email,
    password,
    gender,
    role = Role.Admin,
    isGoogleLogin,
  } = user;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate required fields
    if (!email || (!isGoogleLogin && !password)) {
      throw new AppError("Missing required fields", StatusCodes.BAD_REQUEST);
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser && !isGoogleLogin) {
      throw new AppError("User already exists", StatusCodes.CONFLICT);
    }

    // Handle Google login or standard registration
    const result = isGoogleLogin
      ? await handleGoogleLogin(user, existingUser, session)
      : await handleStandardRegistration(user, session);

    // Commit the transaction and return the result
    await session.commitTransaction();
    return result;
  } catch (error) {
    console.error("Error registering user:", error);
    await session.abortTransaction();

    if (error instanceof AppError) throw error;

    throw new AppError(
      "An unexpected error occurred during registration",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  } finally {
    session.endSession();
  }
};

// Handle Google login registration
const handleGoogleLogin = async (
  user: IUser,
  existingUser: IUser | null,
  session: mongoose.ClientSession
) => {
  const hashedPassword = await hashPassword(user.password);

  if (existingUser) {
    // Return tokens for an existing Google user
    const accessToken = generateAccessToken(
      existingUser._id.toString(),
      existingUser.role
    );
    const refreshToken = await generateRefreshToken(existingUser._id);

    const { password: _, ...userWithoutPassword } = existingUser.toObject();
    return {
      accessToken,
      refreshToken,
      user: userWithoutPassword,
    };
  }

  // Register a new Google user
  const newUser = new User({
    name: user.name,
    email: user.email,
    password: hashedPassword,
    gender: user.gender,
    isVerified: true,
    role: user.role || Role.Admin,
  });

  const savedUser = await newUser.save({ session });
  const accessToken = generateAccessToken(
    savedUser._id.toString(),
    savedUser.role
  );
  const refreshToken = await generateRefreshToken(savedUser._id);

  return {
    accessToken,
    refreshToken,
    user: savedUser.toJSON(),
  };
};

// Handle standard registration (non-Google)
const handleStandardRegistration = async (
  user: IUser,
  session: mongoose.ClientSession
) => {
  const hashedPassword = await hashPassword(user.password);
  const otp = generateOtp();
  const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  const newUser = new User({
    name: user.name,
    email: user.email,
    password: hashedPassword,
    gender: user.gender,
    otp,
    otpExpiration,
    isVerified: false,
    role: user.role || Role.Admin,
  });

  await newUser.save({ session });

  // Send OTP email
  await sendOtpEmail(newUser.email, otp, newUser.name);

  return "User registered. Please verify your email.";
};

const verifyOtpIntoDB = async (email: string, otp: string) => {
  // Find user by email
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  // Check if OTP is valid
  if (user.otp !== otp) {
    throw new AppError("Invalid OTP", StatusCodes.BAD_REQUEST);
  }

  // Check if OTP has expired
  if (!user.otpExpiration || user.otpExpiration < new Date()) {
    throw new AppError("'OTP has expired", StatusCodes.BAD_REQUEST);
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
  console.log("USER", user);
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  // Check if user is verified
  if (!user.isVerified) {
    // Delete the unverified user
    await User.deleteOne({ email });
    throw new AppError(
      "Email not verified. User has been removed.",
      StatusCodes.UNAUTHORIZED
    );
  }
  console.log("user.password", user.password);
  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
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
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
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
      StatusCodes.INTERNAL_SERVER_ERROR
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

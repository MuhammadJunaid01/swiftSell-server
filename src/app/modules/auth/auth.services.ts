import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../errors/globalError";
import { generateOtp, generateToken, sendOtpEmail } from "../../lib/utils";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";

const registerUserIntoDB = async (user: IUser) => {
  const { name, email, password, gender } = user;

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

    // Create new user
    const newUser = new User({
      name,
      email,
      password, // Ensure you hash the password before saving
      gender,
      otp,
      otpExpiration,
      isVerified: false,
    });

    // Save the new user within the transaction
    await newUser.save({ session });

    // Send OTP to user's email
    await sendOtpEmail(email, otp, user.name);

    // Commit the transaction
    await session.commitTransaction();
    return "User registered. Please verify your email.";
  } catch (error) {
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
  const token = generateToken((user as any)?._id.toString() as string);
  return {
    token,
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

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", httpStatus.UNAUTHORIZED);
  }

  // Generate token
  const token = generateToken((user as any)?._id.toString());

  // Return user without password
  const { password: _, ...userWithoutPassword } = user.toObject();
  return {
    token,
    user: userWithoutPassword,
  };
};

export const AuthServices = {
  registerUserIntoDB,
  verifyOtpIntoDB,
  loginUserIntoDB,
};

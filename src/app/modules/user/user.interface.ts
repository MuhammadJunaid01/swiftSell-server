import { Document } from "mongoose";

// Enum for Gender
export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
  PreferNotToSay = "PreferNotToSay",
}
export enum Role {
  Admin = "admin",
  User = "user",
  Manager = "manager",
  Support = "support",
  Analyst = "analyst",
}
type Location = {
  latitude: number; // Latitude of the location
  longitude: number; // Longitude of the location
};

// IUser interface definition
export interface IUser extends Document {
  name: string;
  email: string;
  profileImage?: string;
  phoneNumber?: string;
  gender: Gender;
  location?: Location;
  otp?: string; // OTP for verification
  otpExpiration?: Date; // OTP expiration date
  password: string;
  isVerified: boolean; // Whether the user is verified
  pushToken?: string; // Device token for push notifications
  createdAt?: Date; // Optional: Timestamp for user creation
  updatedAt?: Date; // Optional: Timestamp for user updates
  refreshToken: string;
  role: Role;
}

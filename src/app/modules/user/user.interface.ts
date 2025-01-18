import { Document } from "mongoose";
export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
  PreferNotToSay = "PreferNotToSay",
}
export interface IUser extends Document {
  name: string;
  email: string;
  profileImage?: string;
  phoneNumber?: string;
  gender: Gender;
  location?: string;
  otp?: string;
  otpExpiration?: Date;
  password: string;
  isVerified: boolean;
}

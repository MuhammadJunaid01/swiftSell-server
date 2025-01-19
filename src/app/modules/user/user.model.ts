import { Schema, model } from "mongoose";
import { Gender, IUser } from "./user.interface";

// User schema definition
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String },
    phoneNumber: { type: String },
    gender: { type: String, enum: Gender, required: true },
    location: { type: String },
    otp: { type: String },
    otpExpiration: { type: Date },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    pushToken: { type: String },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const User = model<IUser>("User", userSchema);

export default User;

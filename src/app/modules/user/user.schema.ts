import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    location: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;

import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  profileImage?: string;
  phoneNumber?: string;
  gender: string;
  location?: string;
}

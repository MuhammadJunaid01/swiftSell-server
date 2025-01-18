import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";
import { Gender, IUser } from "./user.interface";

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    location: { type: String, required: false },
    otp: { type: String },
    otpExpiration: { type: Date },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: false,
      default: Gender.PreferNotToSay,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});
UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});
const User = mongoose.model<IUser>("User", UserSchema);

export default User;

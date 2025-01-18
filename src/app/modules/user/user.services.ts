import httpStatus from "http-status";
import { Types } from "mongoose";
import { AppError } from "../../errors/globalError";
import { IUser } from "./user.interface";
import User from "./user.model";

// Define a type for updatable user properties
type UpdatableUser = Omit<IUser, "email" | "password">;

const updateUserIntoDB = async (
  userId: string,
  user: UpdatableUser
): Promise<IUser> => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      { $set: user },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      throw new Error("User Not found.");
    }
    return updatedUser;
  } catch (error: any) {
    throw new AppError(
      `Error updating user: ${error.message}`,
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
export const UserServices = { updateUserIntoDB };

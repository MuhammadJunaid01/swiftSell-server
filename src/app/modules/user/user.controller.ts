import { Request, Response } from "express";
import { StatusCodes } from "../../lib/statusCode";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import { UserServices } from "./user.services";
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id, user } = req.body;
  const response = await UserServices.updateUserIntoDB(id, user);
  sendResponse(res, {
    success: true,
    message: "successfully user  updated ",
    statusCode: StatusCodes.OK,
    data: response,
  });
});
export const UserControllers = { updateUser };

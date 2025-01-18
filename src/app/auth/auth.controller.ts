import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../lib/utils/catchAsync";
import sendResponse from "../lib/utils/sendResponse";
import { AuthServices } from "./auth.services";
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const response = await AuthServices.registerUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: "successfully auth created",
    statusCode: httpStatus.CREATED,
    data: response,
  });
});
export const AuthControllers = { registerUser };

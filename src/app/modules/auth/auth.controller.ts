import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
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
const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const response = await AuthServices.verifyOtpIntoDB(email, otp);
  sendResponse(res, {
    success: true,
    message: "successfully verified",
    statusCode: httpStatus.CREATED,
    data: response,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const response = await AuthServices.loginUserIntoDB(email, password);
  sendResponse(res, {
    success: true,
    message: "successfully verified",
    statusCode: httpStatus.CREATED,
    data: response,
  });
});
const logOutUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const response = await AuthServices.logoutUserFromDB(email);
  sendResponse(res, {
    success: true,
    message: "successfully logged out",
    statusCode: httpStatus.OK,
    data: response,
  });
});
const refreshTokenAndGenerateNewAccessToken = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const response = await AuthServices.refreshAccessToken(refreshToken);
    sendResponse(res, {
      success: true,
      message: "successfully refreshed",
      statusCode: httpStatus.CREATED,
      data: response,
    });
  }
);
export const AuthControllers = {
  registerUser,
  verifyOtp,
  loginUser,
  refreshTokenAndGenerateNewAccessToken,
  logOutUser,
};

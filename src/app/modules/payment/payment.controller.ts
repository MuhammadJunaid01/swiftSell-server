import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import * as PaymentMethodServices from "./payment.service";
export const createPaymentMethod = catchAsync(
  async (req: Request, res: Response) => {
    const { data } = req.body;
    const response = await PaymentMethodServices.createPaymentMethodIntoDB(
      data
    );
    sendResponse(res, {
      message: "successfully created",
      statusCode: httpStatus.CREATED,
      success: true,
      data: response,
    });
  }
);

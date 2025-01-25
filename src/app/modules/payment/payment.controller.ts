// controllers/payment.controller.ts
import { Request, Response } from "express";
import { CustomRequest } from "../../interfaces";
import { StatusCodes } from "../../lib/statusCode";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import {
  getPaymentById,
  processPayment,
  updatePaymentStatus,
} from "./payment.service";

export const handlePayment = catchAsync(async (req: Request, res: Response) => {
  const payment = await processPayment(req.body);

  sendResponse(res, {
    success: true,
    message: "Payment processed successfully",
    data: payment,
    statusCode: StatusCodes.CREATED,
  });
});

export const getPaymentsByUserId = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const id = req.user._id as string;
    const payment = await getPaymentById(id);

    if (!payment) {
      sendResponse(res, {
        success: false,
        message: "Payment not found",
        data: null,
        statusCode: StatusCodes.NOT_FOUND,
      });
    } else {
      sendResponse(res, {
        success: true,
        message: "Payment retrieved successfully",
        data: payment,
        statusCode: StatusCodes.OK,
      });
    }
  }
);

export const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const updatedPayment = await updatePaymentStatus(
    req.params.id,
    req.body.status
  );

  if (!updatedPayment) {
    sendResponse(res, {
      success: false,
      message: "Payment not found",
      data: null,
      statusCode: StatusCodes.NOT_FOUND,
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Payment status updated successfully",
      data: updatedPayment,
      statusCode: StatusCodes.OK,
    });
  }
});

// controllers/payment.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
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
    statusCode: httpStatus.CREATED,
  });
});

export const getPayment = catchAsync(async (req: Request, res: Response) => {
  const payment = await getPaymentById(req.params.id);

  if (!payment) {
    sendResponse(res, {
      success: false,
      message: "Payment not found",
      data: null,
      statusCode: httpStatus.NOT_FOUND,
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Payment retrieved successfully",
      data: payment,
      statusCode: httpStatus.OK,
    });
  }
});

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
      statusCode: httpStatus.NOT_FOUND,
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Payment status updated successfully",
      data: updatedPayment,
      statusCode: httpStatus.OK,
    });
  }
});

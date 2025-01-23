import { Request, Response } from "express";
import httpStatus from "http-status";
import { CustomRequest } from "../../interfaces";
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
export const getPaymentMethodByUserId = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const id = req.user?._id;
    const response =
      await PaymentMethodServices.getPaymentMethodsFromDbByUserId(id);
    if (response.length > 0) {
      sendResponse(res, {
        message: " successfully all retrieve payment methods",
        statusCode: httpStatus.OK,
        data: response,
        success: true,
      });
    } else {
      sendResponse(res, {
        message: "No Data Found!",
        statusCode: httpStatus.OK,
        data: [],
        success: true,
      });
    }
  }
);
export const updatePaymentMethodById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data } = req.body;
    const response = await PaymentMethodServices.updatePaymentMethodById(
      id,
      data
    );
    sendResponse(res, {
      success: true,
      message: "successfully updated payment method.",
      statusCode: httpStatus.OK,
      data: response,
    });
  }
);

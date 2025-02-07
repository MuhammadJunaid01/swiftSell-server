import { Request, Response } from "express";
import { StatusCodes } from "../../lib/statusCode";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import * as ShippingInfoServices from "./shipping.info.service";
export const createShippingInfo = catchAsync(
  async (req: Request, res: Response) => {
    const response = await ShippingInfoServices.createShippingInfoIntoDB(
      req.body
    );
    sendResponse(res, {
      message: "Shipping info created successfully",
      data: response,
      success: true,
      statusCode: StatusCodes.CREATED,
    });
  }
);
export const getShippingInfoByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const response = await ShippingInfoServices.getShippingInfoFromDbByUserId(
      req.params.userId
    );
    if (response.length === 0) {
      sendResponse(res, {
        message: "No shipping info found",
        data: [],
        success: true,
        statusCode: StatusCodes.OK,
      });
      if (response.length > 0) {
        sendResponse(res, {
          message: "Shipping info found",
          data: response,
          success: true,
          statusCode: StatusCodes.OK,
        });
      } else {
        sendResponse(res, {
          message: "No shipping info found",
          data: [],
          success: true,
          statusCode: StatusCodes.OK,
        });
      }
    }
  }
);
export const shippingInfoUpdate = catchAsync(
  async (req: Request, res: Response) => {
    const response = await ShippingInfoServices.updateShippingInfoIntoDB(
      req.params.id,
      req.body
    );
    sendResponse(res, {
      message: "Shipping info updated successfully",
      data: response,
      success: true,
      statusCode: StatusCodes.OK,
    });
  }
);
export const deleteShippingInfo = catchAsync(
  async (req: Request, res: Response) => {
    const response = await ShippingInfoServices.deleteShippingInfoFromDB(
      req.params.id
    );
    sendResponse(res, {
      message: "Shipping info deleted successfully",
      data: response,
      success: true,
      statusCode: StatusCodes.OK,
    });
  }
);

import { Request, Response } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import {
  createDeal,
  deleteDeal,
  getAllDeals,
  getDealById,
  updateDeal,
} from "./deal.service";

// Create a new deal
export const createDealController = catchAsync(
  async (req: Request, res: Response) => {
    const dealData = req.body;
    const newDeal = await createDeal(dealData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Deal created successfully",
      data: newDeal,
    });
  }
);

// Get all deals
export const getAllDealsController = catchAsync(
  async (req: Request, res: Response) => {
    const deals = await getAllDeals();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Deals fetched successfully",
      data: deals,
    });
  }
);

// Get deal by ID
export const getDealByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const { dealId } = req.params;
    const deal = await getDealById(new Types.ObjectId(dealId));

    if (!deal) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Deal not found",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Deal fetched successfully",
      data: deal,
    });
  }
);

// Update a deal
export const updateDealController = catchAsync(
  async (req: Request, res: Response) => {
    const { dealId } = req.params;
    const dealData = req.body;
    const updatedDeal = await updateDeal(new Types.ObjectId(dealId), dealData);

    if (!updatedDeal) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Deal not found",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Deal updated successfully",
      data: updatedDeal,
    });
  }
);

// Delete a deal
export const deleteDealController = catchAsync(
  async (req: Request, res: Response) => {
    const { dealId } = req.params;
    const deletedDeal = await deleteDeal(new Types.ObjectId(dealId));

    if (!deletedDeal) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Deal not found",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      statusCode: httpStatus.NO_CONTENT,
      success: true,
      message: "Deal deleted successfully",
      data: deletedDeal,
    });
  }
);

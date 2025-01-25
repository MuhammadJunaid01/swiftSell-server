import { Request, Response } from "express";
import { StatusCodes } from "../../lib/statusCode";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import { ReturnRequestService } from "./returnRequest.service";

const createReturnRequest = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const returnRequest = await ReturnRequestService.createReturnRequest(data);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Return request created successfully.",
    data: returnRequest,
    success: true,
  });
});

const getReturnRequestById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const returnRequest = await ReturnRequestService.getReturnRequestById(id);
  if (!returnRequest) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: "Return request not found.",
      success: false,
      data: null,
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Return request fetched successfully.",
      data: returnRequest,
      success: true,
    });
  }
});

const getAllReturnRequests = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, ...filters } = req.query;
  const result = await ReturnRequestService.getAllReturnRequests(
    filters,
    Number(limit),
    Number(page)
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Return requests fetched successfully.",
    data: result,
    success: true,
  });
});

const updateReturnRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedRequest = await ReturnRequestService.updateReturnRequest(
    id,
    updateData
  );
  if (!updatedRequest) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: "Return request not found.",
      success: false,
      data: null,
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Return request updated successfully.",
      data: updatedRequest,
      success: true,
    });
  }
});

const deleteReturnRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedRequest = await ReturnRequestService.deleteReturnRequest(id);
  if (!deletedRequest) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: "Return request not found.",
      success: false,
      data: null,
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Return request deleted successfully.",
      success: true,
      data: deletedRequest,
    });
  }
});

export const ReturnRequestController = {
  createReturnRequest,
  getReturnRequestById,
  getAllReturnRequests,
  updateReturnRequest,
  deleteReturnRequest,
};

import { Request, Response } from "express";
import { CustomRequest } from "../../interfaces";
import { StatusCodes } from "../../lib/statusCode";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
} from "./order.service";

/**
 * Create a new order.
 */
export const createOrderHandler = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const orderData = req.body;
    const userId = req.user;

    const newOrder = await createOrder({ ...orderData, user: userId });

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  }
);

/**
 * Get order by ID.
 */
export const getOrderHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await getOrderById(orderId);

    if (!order) {
      sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "Order not found",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  }
);

/**
 * Get all orders for a user.
 */
export const getOrdersForUserHandler = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const userId = req.user?._id as string;

    const orders = await getOrdersByUserId(userId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  }
);

/**
 * Update order status.
 */
export const updateOrderStatusHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await updateOrderStatus(orderId, status);

    if (!updatedOrder) {
      sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "Order not found or unable to update",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  }
);

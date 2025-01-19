import { Request, Response } from "express";
import catchAsync from "../../lib/utils/catchAsync";
import sendResponse from "../../lib/utils/sendResponse";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "./cart.service";

export const addToCartHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;
    const cart = await addToCart(userId, productId, quantity);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  }
);

export const removeFromCartHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, productId } = req.body;
    const cart = await removeFromCart(userId, productId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  }
);

export const updateCartItemHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;
    const cart = await updateCartItem(userId, productId, quantity);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart updated",
      data: cart,
    });
  }
);

export const getCartHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const cart = await getCart(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  }
);

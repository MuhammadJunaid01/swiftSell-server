import { Types } from "mongoose";
import { AppError } from "../../errors/globalError";
import { IOrder, OrderStatus } from "./order.interface";
import { Order } from "./order.model";

/**
 * Create a new order.
 */
export const createOrder = async (
  orderData: Partial<IOrder>
): Promise<IOrder> => {
  const order = await Order.create(orderData);
  return order;
};

/**
 * Get order by ID.
 */
export const getOrderById = async (orderId: string): Promise<IOrder | null> => {
  const order = await Order.findOne({ orderId }).populate("items.product user");
  return order;
};

/**
 * Get all orders for a user.
 */
export const getOrdersByUserId = async (
  userId: string
): Promise<IOrder[] | null> => {
  const orders = await Order.find({
    user: new Types.ObjectId(userId),
  }).populate("items.product");
  return orders;
};

/**
 * Update the status of an order.
 */

export const updateOrderStatus = async (
  orderId: string,
  newStatus: OrderStatus
): Promise<IOrder> => {
  const order = await Order.findOne({ orderId });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  // Update the status and push a new record to statusRecord
  order.status = newStatus;
  order.statusRecord.push({ date: new Date(), status: newStatus });

  // Save the updated order
  await order.save();

  return order;
};

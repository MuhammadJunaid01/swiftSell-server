import { Types } from "mongoose";
import { IOrder, OrderStatus } from "./order.interface";
import { Order } from "./order.model";

/**
 * Create a new order.
 */
export const createOrder = async (orderData: Partial<IOrder>) => {
  const order = await Order.create(orderData);
  return order;
};

/**
 * Get order by ID.
 */
export const getOrderById = async (orderId: string) => {
  const order = await Order.findOne({ orderId }).populate("items.product user");
  return order;
};

/**
 * Get all orders for a user.
 */
export const getOrdersByUserId = async (userId: string) => {
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
  status: OrderStatus
) => {
  const updatedOrder = await Order.findOneAndUpdate(
    { orderId },
    { status },
    { new: true }
  );
  return updatedOrder;
};

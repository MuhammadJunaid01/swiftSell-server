import { startSession, Types } from "mongoose";
import { AppError } from "../../errors/globalError";
import { IPayment } from "../payment/payment.interface";
import Payment from "../payment/payment.model";
import { IOrder, OrderStatus } from "./order.interface";
import { Order } from "./order.model";

/**
 * Create a new order.
 */
export const createOrder = async (
  orderData: Partial<IOrder>
): Promise<IOrder | null> => {
  const session = await startSession();
  session.startTransaction();

  try {
    if (orderData.isPaid) {
      // Create the order
      const [order] = await Order.create([{ ...orderData }], { session });

      if (!order) {
        throw new Error("Order creation failed.");
      }

      // Create the payment
      const paymentPayload: IPayment = {
        user: new Types.ObjectId(orderData.user),
        order: order._id,
        method: orderData.paymentMethod as IPayment["method"],
        amount: orderData.totalAmount as number,
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const [newPayment] = await Payment.create([paymentPayload], { session });

      if (!newPayment) {
        throw new Error("Payment creation failed.");
      }
      console.log("newPayment  newPayment._id", newPayment._id);
      // Assign transaction ID to the order
      order.transactionId = newPayment._id.toString();

      // Save the updated order
      await order.save({ session });

      // Commit the transaction
      await session.commitTransaction();

      return order;
    }

    const order = await Order.create(orderData);
    return order;
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction failed:", error);
    if (error instanceof Error) {
      throw new AppError(error.message, 500);
    } else {
      throw new AppError("An unknown error occurred", 500);
    }
  } finally {
    session.endSession();
  }
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

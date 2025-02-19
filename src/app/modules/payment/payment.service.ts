// services/payment.service.ts
import Stripe from "stripe";
import config from "../../config";
import { AppError } from "../../errors/globalError";
import User from "../user/user.model";
import { IPayment } from "./payment.interface";
import Payment from "./payment.model";

const stripe = new Stripe(config.stripe_secret_key as string);

// const paypalClient = new paypal.core.PayPalHttpClient(
//   new paypal.core.SandboxEnvironment(
//     process.env.PAYPAL_CLIENT_ID!,
//     process.env.PAYPAL_SECRET!
//   )
// );

/**
 * Process payment based on the payment method.
 */
export const processPayment = async (data: {
  method: string;
  paypalOrderId?: string;
  totalAmount: number;
  userId: string;
}): Promise<any> => {
  const { method, totalAmount, userId } = data;
  console.log("data", data);
  if (method === "Stripe") {
    // Use an existing Customer ID if this is a returning customer.
    const user = await User.findById(userId);
    if (!user?._id) {
      throw new AppError("User is required for Stripe payment.", 400);
    }
    if (!totalAmount) {
      throw new AppError("Amount is required for Stripe payment.", 400);
    }

    // Convert to smallest currency unit (e.g., cents)
    const amountInCents = Math.round(totalAmount * 100);
    const customer = await stripe.customers.create({
      name: "junaid",
    });
    console.log("customer", customer);
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2025-01-27.acacia" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "eur",
      customer: customer.id,
      payment_method_types: ["card"], // Only allow card payments
    });
    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    };
  } else if (method === "PayPal") {
    // Process PayPal Payment
    // const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId!);
    // request.requestBody({} as any);
    // const capture = await paypalClient.execute(request);
    // transactionId = capture.result.id;
    // status = "Completed";
  } else if (method === "CashOnDelivery") {
    // Cash on Delivery
  } else {
    throw new Error("Invalid payment method");
  }

  // // Create Payment Record in the Database
  // const payment = new Payment({
  //   user,
  //   order,
  //   method,
  //   amount,
  //   transactionId,
  //   status,
  // });

  // await payment.save();

  // return payment;
};

/**
 * Get payment by ID.
 */
export const getPaymentById = async (id: string): Promise<IPayment | null> => {
  return Payment.findById(id).populate("user").populate("order");
};

/**
 * Update payment status.
 */
export const updatePaymentStatus = async (
  id: string,
  status: string
): Promise<IPayment | null> => {
  return Payment.findByIdAndUpdate(id, { status }, { new: true });
};

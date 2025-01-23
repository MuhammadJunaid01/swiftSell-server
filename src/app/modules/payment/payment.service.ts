// services/payment.service.ts
import paypal from "@paypal/checkout-server-sdk";
import Stripe from "stripe";
import { IPayment } from "./payment.interface";
import Payment from "./payment.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

const paypalClient = new paypal.core.PayPalHttpClient(
  new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID!,
    process.env.PAYPAL_SECRET!
  )
);

/**
 * Process payment based on the payment method.
 */
export const processPayment = async (data: {
  user: string;
  order: string;
  method: string;
  amount: number;
  token?: string;
  paypalOrderId?: string;
}): Promise<IPayment> => {
  const { user, order, method, amount, token, paypalOrderId } = data;

  let transactionId: string | undefined;
  let status = "Pending";

  if (method === "Stripe") {
    // Process Stripe Payment
    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      source: token,
      description: `Payment for Order ${order}`,
    });
    transactionId = charge.id;
    status = "Completed";
  } else if (method === "PayPal") {
    // Process PayPal Payment
    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId!);
    request.requestBody({} as any);
    const capture = await paypalClient.execute(request);
    transactionId = capture.result.id;
    status = "Completed";
  } else if (method === "CashOnDelivery") {
    // Cash on Delivery
    transactionId = undefined; // No transaction ID for COD
  } else {
    throw new Error("Invalid payment method");
  }

  // Create Payment Record in the Database
  const payment = new Payment({
    user,
    order,
    method,
    amount,
    transactionId,
    status,
  });

  await payment.save();

  return payment;
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

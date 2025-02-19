import { Schema, model } from "mongoose";
import { IOrder, OrderStatus } from "./order.interface";

// Generate a unique 8-digit order ID
const generateOrderId = async (): Promise<string> => {
  let orderId: string;
  while (true) {
    const randomDigits = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString(); // Generate 8-digit number
    const existingOrder = await Order.findOne({ orderId: randomDigits });
    if (!existingOrder) {
      orderId = randomDigits;
      break;
    }
  }
  return orderId;
};

// Generate a unique 8-digit paymentId

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, unique: true, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Pending,
    },
    shippingAddress: { type: String },
    shippingMethod: { type: String },
    paymentMethod: { type: String, enum: ["COD", "Stripe"], required: true },
    isPaid: { type: Boolean, default: false },
    transactionId: { type: String },
    deliveredAt: { type: Date },
    discount: { type: Number, required: true },
    statusRecord: [
      {
        date: { type: Date, required: true },
        status: {
          type: String,
          enum: Object.values(OrderStatus),
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Pre-validate hook to generate unique orderId before validation
OrderSchema.pre<IOrder>("validate", async function (next) {
  // Ensure a unique orderId is generated
  if (!this.orderId) {
    this.orderId = await generateOrderId();
  }

  // Initialize statusRecord with the current status if not already present
  if (!this.statusRecord || this.statusRecord.length === 0) {
    this.statusRecord = [{ date: new Date(), status: this.status }];
  }

  next();
});

export const Order = model<IOrder>("Order", OrderSchema);

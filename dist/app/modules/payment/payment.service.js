"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatus = exports.getPaymentById = exports.processPayment = void 0;
// services/payment.service.ts
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const payment_model_1 = __importDefault(require("./payment.model"));
const stripe = new stripe_1.default(config_1.default.stripe_secret_key);
// const paypalClient = new paypal.core.PayPalHttpClient(
//   new paypal.core.SandboxEnvironment(
//     process.env.PAYPAL_CLIENT_ID!,
//     process.env.PAYPAL_SECRET!
//   )
// );
/**
 * Process payment based on the payment method.
 */
const processPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, order, method, amount, token, paypalOrderId } = data;
    let transactionId;
    let status = "Pending";
    if (method === "Stripe") {
        // Process Stripe Payment
        const charge = yield stripe.charges.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: "usd",
            source: token,
            description: `Payment for Order ${order}`,
        });
        transactionId = charge.id;
        status = "Completed";
    }
    else if (method === "PayPal") {
        // Process PayPal Payment
        // const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId!);
        // request.requestBody({} as any);
        // const capture = await paypalClient.execute(request);
        // transactionId = capture.result.id;
        // status = "Completed";
    }
    else if (method === "CashOnDelivery") {
        // Cash on Delivery
        transactionId = undefined; // No transaction ID for COD
    }
    else {
        throw new Error("Invalid payment method");
    }
    // Create Payment Record in the Database
    const payment = new payment_model_1.default({
        user,
        order,
        method,
        amount,
        transactionId,
        status,
    });
    yield payment.save();
    return payment;
});
exports.processPayment = processPayment;
/**
 * Get payment by ID.
 */
const getPaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return payment_model_1.default.findById(id).populate("user").populate("order");
});
exports.getPaymentById = getPaymentById;
/**
 * Update payment status.
 */
const updatePaymentStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    return payment_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
});
exports.updatePaymentStatus = updatePaymentStatus;

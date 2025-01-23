// routes/payment.route.ts
import { Router } from "express";
import { getPayment, handlePayment, updatePayment } from "./payment.controller";

const router = Router();

// Route to handle payment processing
router.post("/", handlePayment);

// Route to get a specific payment by ID
router.get("/:id", getPayment);

// Route to update payment status
router.patch("/:id", updatePayment);

export { router as paymentRoute };

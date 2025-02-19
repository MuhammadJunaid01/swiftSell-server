// routes/payment.route.ts
import { Router } from "express";
import authGuard from "../../middlewares/authMiddleware";
import { Role } from "../user/user.interface";
import {
  getPaymentsByUserId,
  handlePayment,
  updatePayment,
} from "./payment.controller";

const router = Router();

// Route to handle payment processing
router.post("/initiate", handlePayment);

// Route to get a specific payment by ID
router.get("/:id", authGuard(Role.Admin), getPaymentsByUserId);

// Route to update payment status
router.patch("/:id", updatePayment);

export { router as paymentRouter };

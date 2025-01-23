import { Router } from "express";
import authGuard from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import * as PaymentMethodControllers from "./payment.controller";
import { paymentMethodValidation } from "./payment.validation";
const router = Router();
router.post(
  "/create-payment-method",
  authGuard(Role.User),
  validateRequest(paymentMethodValidation),
  PaymentMethodControllers.createPaymentMethod
);
export { router as paymentRouter };

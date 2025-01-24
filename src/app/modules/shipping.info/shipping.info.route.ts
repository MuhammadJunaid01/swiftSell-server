import { Router } from "express";
import authGuard from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import * as ShippingInfoControllers from "./shipping.info.controller";
import { shippingInfoValidationSchema } from "./shipping.info.validation";
const router = Router();
router.post(
  "/create",
  authGuard(Role.Admin),
  validateRequest(shippingInfoValidationSchema),
  ShippingInfoControllers.createShippingInfo
);
router.get("/:id", ShippingInfoControllers.getShippingInfoByUserId);
router.put(
  "/:id",
  authGuard(Role.Admin),
  ShippingInfoControllers.shippingInfoUpdate
);
export { router as shippingInfoRouter };

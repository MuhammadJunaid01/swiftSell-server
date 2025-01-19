import express from "express";
import authGuard from "../../middlewares/authMiddleware";
import { Role } from "../user/user.interface";
import {
  createOrderHandler,
  getOrderHandler,
  getOrdersForUserHandler,
  updateOrderStatusHandler,
} from "./order.controller";

const router = express.Router();

// Create a new order
router.post("/create", authGuard(Role.User), createOrderHandler);

// Get order by ID
router.get("/:orderId", authGuard(Role.User), getOrderHandler);

// Get all orders for the authenticated user
router.get("/", authGuard(Role.User), getOrdersForUserHandler);

// Update order status
router.patch(
  "/:orderId/status",
  authGuard(Role.Admin),
  updateOrderStatusHandler
);

export { router as orderRouter };

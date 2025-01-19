import express from "express";
import authGuard from "../../middlewares/authMiddleware";
import {
  createOrderHandler,
  getOrderHandler,
  getOrdersForUserHandler,
  updateOrderStatusHandler,
} from "./order.controller";

const router = express.Router();

// Create a new order
router.post("/create", authGuard("user"), createOrderHandler);

// Get order by ID
router.get("/:orderId", authGuard("user"), getOrderHandler);

// Get all orders for the authenticated user
router.get("/", authGuard("user"), getOrdersForUserHandler);

// Update order status
router.patch("/:orderId/status", authGuard("admin"), updateOrderStatusHandler);

export { router as orderRouter };

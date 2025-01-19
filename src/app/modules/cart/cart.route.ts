import { Router } from "express";
import {
  addToCartHandler,
  getCartHandler,
  removeFromCartHandler,
  updateCartItemHandler,
} from "./cart.controller";

const router = Router();

// Route for adding items to the cart
router.post("/add", addToCartHandler);

// Route for removing items from the cart
router.post("/remove", removeFromCartHandler);

// Route for updating item quantity
router.post("/update", updateCartItemHandler);

// Route for fetching the user's cart
router.get("/:userId", getCartHandler);

export { router as cartRouter };

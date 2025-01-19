import { Types } from "mongoose";
import { Product } from "../product/product.model";
import { ICartItem } from "./cart.interface";
import { Cart } from "./cart.model";

// Add item to the cart
export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [],
      totalPrice: 0,
      totalItems: 0,
    });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    const existingItem = cart.items[existingItemIndex];
    existingItem.quantity += quantity;
    existingItem.total = existingItem.price * existingItem.quantity;
  } else {
    const newItem: ICartItem = {
      product: new Types.ObjectId(productId),
      quantity,
      price: product.price,
      total: product.price * quantity,
    };
    cart.items.push(newItem);
  }

  await cart.save();
  return cart;
};

// Remove item from the cart
export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();
  return cart;
};

// Update item quantity in the cart
export const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    throw new Error("Item not found in cart");
  }

  cart.items[itemIndex].quantity = quantity;
  cart.items[itemIndex].total = cart.items[itemIndex].price * quantity;

  await cart.save();
  return cart;
};

// Get the user's cart
export const getCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    throw new Error("Cart not found");
  }
  return cart;
};

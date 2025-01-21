import httpStatus from "http-status";
import mongoose, { Types } from "mongoose";
import { AppError } from "../../errors/globalError";
import { Product } from "../product/product.model";
import { IDeal } from "./deal.interface";
import { Deal } from "./deal.model";

// Create a new deal
export const createDeal = async (dealData: IDeal) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate and update all products associated with the deal
    const products = await Product.find({
      _id: { $in: dealData.products },
    }).session(session);

    if (products.length !== dealData.products.length) {
      throw new AppError(
        "Some products in the deal do not exist",
        httpStatus.BAD_REQUEST
      );
    }

    // Update each product's deal-related fields
    await Promise.all(
      products.map((product) => {
        product.isDeal = true;
        if (product.discount) {
          product.discount.type = dealData.discountType; // Optionally map deal type
        }
        product.dealExpiry = dealData.dealEndDate;
        return product.save({ session });
      })
    );

    // Create the new deal
    const newDeal = new Deal(dealData);
    await newDeal.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return newDeal;
  } catch (error: any) {
    // Rollback transaction on error
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      "Error creating deal: " + error?.message,
      error?.status || httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

// Get all deals
export const getAllDeals = async () => {
  try {
    return await Deal.find().populate("products");
  } catch (error: any) {
    throw new Error("Error fetching deals: " + error.message);
  }
};

// Get deal by ID
export const getDealById = async (dealId: Types.ObjectId) => {
  try {
    return await Deal.findById(dealId).populate("products");
  } catch (error: any) {
    throw new Error("Error fetching deal: " + error.message);
  }
};

// Update a deal
export const updateDeal = async (
  dealId: Types.ObjectId,
  dealData: Partial<IDeal>
) => {
  try {
    return await Deal.findByIdAndUpdate(dealId, dealData, {
      new: true,
    }).populate("products");
  } catch (error: any) {
    throw new Error("Error updating deal: " + error.message);
  }
};

// Delete a deal
export const deleteDeal = async (dealId: Types.ObjectId) => {
  try {
    return await Deal.findByIdAndDelete(dealId);
  } catch (error: any) {
    throw new Error("Error deleting deal: " + error.message);
  }
};

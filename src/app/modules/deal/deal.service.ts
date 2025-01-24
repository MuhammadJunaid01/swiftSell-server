import mongoose, { Types } from "mongoose";
import { Product } from "../product/product.model";
import { IDeal } from "./deal.interface";
import { Deal } from "./deal.model";

// Create a new deal
export const createDeal = async (dealData: IDeal) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Extract product IDs from the dealData
    const productIds = dealData.products.map((item) => item.productId);

    // Validate and update all products associated with the deal
    const products = await Product.find({
      _id: { $in: productIds },
    }).session(session);

    if (products.length !== dealData.products.length) {
      throw new Error("Some products in the deal do not exist");
    }

    // Update each product's deal-related fields
    await Promise.all(
      dealData.products.map(async ({ productId, discount }) => {
        const product = products.find((prod) =>
          (prod as any)?._id?.equals(productId)
        );
        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }

        product.isDeal = true;
        if (product.discount) {
          product.discount.type = dealData.discountType;
        }
        product.dealExpiry = dealData.dealEndDate;
        product.discount = {
          type: dealData.discountType,
          value: discount,
          validFrom: dealData.dealStartDate,
          validTo: dealData.dealEndDate,
        };

        await product.save({ session });
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
    throw new Error("Error creating deal: " + error.message);
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

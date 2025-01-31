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
    // Extract product IDs from the deal data
    const productIds = dealData.products.map((item) => item.productId);

    // Fetch and validate products
    const products = await Product.find({
      _id: { $in: productIds },
    }).session(session);

    if (products.length !== productIds.length) {
      throw new Error("Some products in the deal do not exist.");
    }

    // Update product deal-related fields
    await Promise.all(
      products.map(async (product: any) => {
        const dealProduct = dealData.products.find(({ productId }) =>
          (product._id as Types.ObjectId).equals(productId)
        );
        if (!dealProduct) {
          throw new AppError(
            `Product with ID ${product._id} is not included in the deal data.`,
            400
          );
        }

        // Update product discount and other deal-related fields
        product.isDeal = true;
        product.discount = {
          type: dealData.discountType,
          value: dealProduct.discount,
          validFrom: dealData.dealStartDate,
          validTo: dealData.dealEndDate,
        };
        product.dealExpiry = dealData.dealEndDate;

        await product.save({ session });
      })
    );

    // Create the new deal
    const newDeal = new Deal(dealData);
    await newDeal.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    return newDeal;
  } catch (error: any) {
    // Rollback transaction on error
    await session.abortTransaction();
    throw new Error(`Error creating deal: ${error.message}`);
  } finally {
    session.endSession();
  }
};

// Get all deals
export const getAllDeals = async () => {
  try {
    return await Deal.find().populate("products.productId");
  } catch (error: any) {
    throw new Error(`Error fetching deals: ${error.message}`);
  }
};

// Get deal by ID
export const getDealById = async (dealId: Types.ObjectId) => {
  try {
    return await Deal.findById(dealId).populate("products.productId");
  } catch (error: any) {
    throw new Error(`Error fetching deal: ${error.message}`);
  }
};

// Update a deal
export const updateDeal = async (
  dealId: Types.ObjectId,
  dealData: Partial<IDeal>
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingDeal = await Deal.findById(dealId).session(session);
    if (!existingDeal) {
      throw new Error("Deal not found.");
    }

    // Fetch associated products
    const productIds = dealData.products?.map((item) => item.productId) || [];
    const products = await Product.find({
      _id: { $in: productIds },
    }).session(session);

    // Update products if necessary
    if (dealData.products) {
      await Promise.all(
        products.map(async (product) => {
          const dealProduct = dealData.products!.find(({ productId }) =>
            (product._id as Types.ObjectId).equals(productId)
          );
          if (dealProduct) {
            product.discount = {
              type: dealData.discountType!,
              value: dealProduct.discount,
              validFrom: dealData.dealStartDate!,
              validTo: dealData.dealEndDate!,
            };
            product.isDeal = true;

            await product.save({ session });
          }
        })
      );
    }

    // Update the deal itself
    const updatedDeal = await Deal.findByIdAndUpdate(dealId, dealData, {
      new: true,
    }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    return updatedDeal;
  } catch (error: any) {
    // Rollback transaction on error
    await session.abortTransaction();
    throw new Error(`Error updating deal: ${error.message}`);
  } finally {
    session.endSession();
  }
};

// Delete a deal
export const deleteDeal = async (dealId: Types.ObjectId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deal = await Deal.findById(dealId).session(session);
    if (!deal) {
      throw new Error("Deal not found.");
    }

    // Fetch associated products
    const productIds = deal.products.map((item) => item.productId);
    const products = await Product.find({
      _id: { $in: productIds },
    }).session(session);

    // Reset product deal-related fields
    await Promise.all(
      products.map(async (product) => {
        product.isDeal = false;
        product.discount = undefined;

        await product.save({ session });
      })
    );

    // Delete the deal
    await Deal.findByIdAndDelete(dealId).session(session);

    // Commit the transaction
    await session.commitTransaction();
    return { message: "Deal deleted successfully." };
  } catch (error: any) {
    // Rollback transaction on error
    await session.abortTransaction();
    throw new Error(`Error deleting deal: ${error.message}`);
  } finally {
    session.endSession();
  }
};

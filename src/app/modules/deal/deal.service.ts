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
    // Extract productIds from the deal data
    const dealProducts = dealData.products;

    // Fetch and validate products
    const products = await Product.find({
      _id: { $in: dealProducts.map((item) => item.productId) },
    })
      .select("_id  category") // Only fetch _id and categoryId to optimize query
      .session(session);

    if (products.length !== dealProducts.length) {
      throw new AppError("Some products in the deal do not exist.", 400);
    }

    // Update the dealProducts array with categoryId
    const updatedDealProducts = dealProducts.map((dealProduct) => {
      const product = products.find((prod) =>
        (prod._id as Types.ObjectId).equals(dealProduct.productId)
      );
      console.log("product", product);
      if (!product) {
        throw new AppError(
          `Product with ID ${dealProduct.productId} is not included in the deal data.`,
          400
        );
      }

      return {
        ...dealProduct,
        categoryId: product.category, // Include categoryId from the product
      };
    });

    // Update dealData with updated products
    dealData.products = updatedDealProducts;

    // Update product deal-related fields
    await Promise.all(
      products.map(async (product: any) => {
        const dealProduct = dealProducts.find(({ productId }) =>
          (product._id as Types.ObjectId).equals(productId)
        );

        if (!dealProduct) {
          throw new AppError(
            `Product with ID ${product._id} is not included in the deal data.`,
            400
          );
        }

        // Construct and validate the discount object
        const discount = {
          type: dealData.discountType as "percentage" | "fixed", // Enum type for validation
          value: Number(dealProduct.discount), // Ensure value is a number
          validFrom: new Date(dealData.dealStartDate), // Ensure valid date
          validTo: new Date(dealData.dealEndDate), // Ensure valid date
        };

        product.isDeal = true;
        product.discount = discount; // Assign the constructed discount object

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
    console.log("error.message", error.message);
    throw new AppError(`Error creating deal: ${error.message}`, 500);
  } finally {
    session.endSession();
  }
};

// Get all deals
export const getAllDeals = async (query: any) => {
  try {
    const { dealType, categoryId } = query;

    // Build the query object for filtering
    const filter: any = {};
    if (categoryId) {
      filter["products"] = { $elemMatch: { categoryId } }; // Filter by categoryId within products array
    }
    if (dealType) {
      filter.dealType = dealType; // Filter by dealType
    }

    // Fetch deals based on the filter
    const deals = await Deal.find(filter).populate({
      path: "products.productId",
      populate: { path: "category", select: "name" }, // Populate product category with the name field
    });

    if (dealType) {
      const products = deals.flatMap((deal) =>
        deal.products.map((product) => ({
          ...product.productId._doc, // Include product details
          discount: product.discount, // Include discount
        }))
      );
      const dealStartDate = deals[0]?.dealStartDate;
      const dealEndDate = deals[0]?.dealEndDate;

      return { products, dealStartDate, dealEndDate };
    }

    // If no `dealType` filter is present, return the entire deal data
    return deals;
  } catch (error: any) {
    console.error("Error fetching deals:", error.message);
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

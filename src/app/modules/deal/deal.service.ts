import { Types } from "mongoose";
import { IDeal } from "./deal.interface";
import { Deal } from "./deal.model";

// Create a new deal
export const createDeal = async (dealData: IDeal) => {
  try {
    const newDeal = new Deal(dealData);
    return await newDeal.save();
  } catch (error: any) {
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

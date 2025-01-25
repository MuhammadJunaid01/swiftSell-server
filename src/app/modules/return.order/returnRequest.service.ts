// services/returnRequest.service.ts

import { IReturnRequest } from "./return.order.interface";
import { ReturnRequestModel } from "./return.order.model";

const createReturnRequest = async (data: IReturnRequest) => {
  const returnRequest = new ReturnRequestModel(data);
  return await returnRequest.save();
};

const getReturnRequestById = async (id: string) => {
  return await ReturnRequestModel.findById(id)
    .populate("orderId")
    .populate("userId")
    .populate("items.productId");
};

const updateReturnRequest = async (
  id: string,
  updateData: Partial<IReturnRequest>
) => {
  return await ReturnRequestModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const getAllReturnRequests = async (
  filters: Record<string, any>,
  limit: number,
  page: number
) => {
  const skip = (page - 1) * limit;
  const returnRequests = await ReturnRequestModel.find(filters)
    .populate("orderId")
    .populate("userId")
    .populate("items.productId")
    .skip(skip)
    .limit(limit);

  const total = await ReturnRequestModel.countDocuments(filters);

  return { returnRequests, total, page, limit };
};

const deleteReturnRequest = async (id: string) => {
  return await ReturnRequestModel.findByIdAndDelete(id);
};

export const ReturnRequestService = {
  createReturnRequest,
  getReturnRequestById,
  updateReturnRequest,
  getAllReturnRequests,
  deleteReturnRequest,
};

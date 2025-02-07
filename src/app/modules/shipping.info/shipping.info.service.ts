import { Types } from "mongoose";
import { ShippingInfo } from "./shipping.info.interface";
import { ShippingInfoModel } from "./shipping.info.model";

export const createShippingInfoIntoDB = async (shippingInfo: ShippingInfo) => {
  console.log("shippingInfo", shippingInfo);
  const response = await ShippingInfoModel.create(shippingInfo);
  return response;
};
export const getShippingInfoFromDbByUserId = async (id: string) => {
  const response = await ShippingInfoModel.find({
    user: new Types.ObjectId(id),
  });
  return response;
};
export const updateShippingInfoIntoDB = async (
  id: string,
  shippingData: Partial<ShippingInfo>
) => {
  const response = await ShippingInfoModel.findByIdAndUpdate(id, shippingData, {
    new: true,
  });
  return response;
};
export const deleteShippingInfoFromDB = async (id: string) => {
  const response = await ShippingInfoModel.findByIdAndDelete(id);
  return response;
};

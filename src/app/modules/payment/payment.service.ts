import { Types } from "mongoose";
import { PaymentMethod } from "./payment.interface";
import { PaymentMethodModel } from "./payment.model";

export const createPaymentMethodIntoDB = async (
  paymentMethod: PaymentMethod
) => {
  const response = await PaymentMethodModel.create(paymentMethod);
  return response;
};
export const getPaymentMethodsFromDbByUserId = async (userId: string) => {
  const response = await PaymentMethodModel.find({
    user: new Types.ObjectId(userId),
  });
  return response;
};
export const updatePaymentMethodById = async (
  paymentMethodId: string,
  paymentMethod: Partial<PaymentMethod>
) => {
  const response = await PaymentMethodModel.findByIdAndUpdate(
    paymentMethodId,
    paymentMethod,
    { new: true }
  );
  return response;
};
export const deletePaymentMethodById = async (paymentMethodId: string) => {
  const response = await PaymentMethodModel.findByIdAndDelete(paymentMethodId);
  return response;
};
export const setDefaultPaymentMethod = async (
  userId: string,
  paymentMethodId: string
) => {
  await PaymentMethodModel.updateMany(
    { user: new Types.ObjectId(userId) },
    { isDefault: false }
  );
  const response = await PaymentMethodModel.findByIdAndUpdate(
    paymentMethodId,
    { isDefault: true },
    { new: true }
  );
  return response;
};

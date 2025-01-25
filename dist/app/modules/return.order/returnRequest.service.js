"use strict";
// services/returnRequest.service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRequestService = void 0;
const return_order_model_1 = require("./return.order.model");
const createReturnRequest = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const returnRequest = new return_order_model_1.ReturnRequestModel(data);
    return yield returnRequest.save();
});
const getReturnRequestById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield return_order_model_1.ReturnRequestModel.findById(id)
        .populate("orderId")
        .populate("userId")
        .populate("items.productId");
});
const updateReturnRequest = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield return_order_model_1.ReturnRequestModel.findByIdAndUpdate(id, updateData, {
        new: true,
    });
});
const getAllReturnRequests = (filters, limit, page) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const returnRequests = yield return_order_model_1.ReturnRequestModel.find(filters)
        .populate("orderId")
        .populate("userId")
        .populate("items.productId")
        .skip(skip)
        .limit(limit);
    const total = yield return_order_model_1.ReturnRequestModel.countDocuments(filters);
    return { returnRequests, total, page, limit };
});
const deleteReturnRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield return_order_model_1.ReturnRequestModel.findByIdAndDelete(id);
});
exports.ReturnRequestService = {
    createReturnRequest,
    getReturnRequestById,
    updateReturnRequest,
    getAllReturnRequests,
    deleteReturnRequest,
};

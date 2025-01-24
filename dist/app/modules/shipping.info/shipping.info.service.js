"use strict";
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
exports.deleteShippingInfoFromDB = exports.updateShippingInfoIntoDB = exports.getShippingInfoFromDbByUserId = exports.createShippingInfoIntoDB = void 0;
const mongoose_1 = require("mongoose");
const shipping_info_model_1 = require("./shipping.info.model");
const createShippingInfoIntoDB = (shippingInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield shipping_info_model_1.ShippingInfoModel.create(shippingInfo);
    return response;
});
exports.createShippingInfoIntoDB = createShippingInfoIntoDB;
const getShippingInfoFromDbByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield shipping_info_model_1.ShippingInfoModel.find({
        user: new mongoose_1.Types.ObjectId(id),
    });
    return response;
});
exports.getShippingInfoFromDbByUserId = getShippingInfoFromDbByUserId;
const updateShippingInfoIntoDB = (id, shippingData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield shipping_info_model_1.ShippingInfoModel.findByIdAndUpdate(id, shippingData, {
        new: true,
    });
    return response;
});
exports.updateShippingInfoIntoDB = updateShippingInfoIntoDB;
const deleteShippingInfoFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield shipping_info_model_1.ShippingInfoModel.findByIdAndDelete(id);
    return response;
});
exports.deleteShippingInfoFromDB = deleteShippingInfoFromDB;

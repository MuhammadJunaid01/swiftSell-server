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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeal = exports.updateDeal = exports.getDealById = exports.getAllDeals = exports.createDeal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("../product/product.model");
const deal_model_1 = require("./deal.model");
// Create a new deal
const createDeal = (dealData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Extract product IDs from the dealData
        const productIds = dealData.products.map((item) => item.productId);
        // Validate and update all products associated with the deal
        const products = yield product_model_1.Product.find({
            _id: { $in: productIds },
        }).session(session);
        if (products.length !== dealData.products.length) {
            throw new Error("Some products in the deal do not exist");
        }
        // Update each product's deal-related fields
        yield Promise.all(dealData.products.map((_a) => __awaiter(void 0, [_a], void 0, function* ({ productId, discount }) {
            const product = products.find((prod) => { var _a; return (_a = prod === null || prod === void 0 ? void 0 : prod._id) === null || _a === void 0 ? void 0 : _a.equals(productId); });
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
            yield product.save({ session });
        })));
        // Create the new deal
        const newDeal = new deal_model_1.Deal(dealData);
        yield newDeal.save({ session });
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        return newDeal;
    }
    catch (error) {
        // Rollback transaction on error
        yield session.abortTransaction();
        session.endSession();
        throw new Error("Error creating deal: " + error.message);
    }
});
exports.createDeal = createDeal;
// Get all deals
const getAllDeals = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield deal_model_1.Deal.find().populate("products");
    }
    catch (error) {
        throw new Error("Error fetching deals: " + error.message);
    }
});
exports.getAllDeals = getAllDeals;
// Get deal by ID
const getDealById = (dealId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield deal_model_1.Deal.findById(dealId).populate("products");
    }
    catch (error) {
        throw new Error("Error fetching deal: " + error.message);
    }
});
exports.getDealById = getDealById;
// Update a deal
const updateDeal = (dealId, dealData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield deal_model_1.Deal.findByIdAndUpdate(dealId, dealData, {
            new: true,
        }).populate("products");
    }
    catch (error) {
        throw new Error("Error updating deal: " + error.message);
    }
});
exports.updateDeal = updateDeal;
// Delete a deal
const deleteDeal = (dealId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield deal_model_1.Deal.findByIdAndDelete(dealId);
    }
    catch (error) {
        throw new Error("Error deleting deal: " + error.message);
    }
});
exports.deleteDeal = deleteDeal;

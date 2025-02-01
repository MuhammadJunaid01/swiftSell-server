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
const globalError_1 = require("../../errors/globalError");
const product_model_1 = require("../product/product.model");
const deal_model_1 = require("./deal.model");
// Create a new deal
const createDeal = (dealData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Extract productIds and discounts from the deal data
        const dealProducts = dealData.products;
        // Fetch and validate products
        const products = yield product_model_1.Product.find({
            _id: { $in: dealProducts.map((item) => item.productId) },
        }).session(session);
        if (products.length !== dealProducts.length) {
            throw new globalError_1.AppError("Some products in the deal do not exist.", 400);
        }
        // Update product deal-related fields
        yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            // Find the corresponding deal product object with discount
            const dealProduct = dealProducts.find(({ productId }) => product._id.equals(productId));
            if (!dealProduct) {
                throw new globalError_1.AppError(`Product with ID ${product._id} is not included in the deal data.`, 400);
            }
            // Construct and validate the discount object
            const discount = {
                type: dealData.discountType, // Enum type for validation
                value: Number(dealProduct.discount), // Ensure value is a number
                validFrom: new Date(dealData.dealStartDate), // Ensure valid date
                validTo: new Date(dealData.dealEndDate), // Ensure valid date
            };
            product.isDeal = true;
            product.discount = discount; // Assign the constructed discount object
            yield product.save({ session });
        })));
        // Create the new deal
        const newDeal = new deal_model_1.Deal(dealData);
        yield newDeal.save({ session });
        // Commit the transaction
        yield session.commitTransaction();
        return newDeal;
    }
    catch (error) {
        // Rollback transaction on error
        yield session.abortTransaction();
        console.log("error.message", error.message);
        throw new globalError_1.AppError(`Error creating deal: ${error.message}`, 500);
    }
    finally {
        session.endSession();
    }
});
exports.createDeal = createDeal;
// Get all deals
const getAllDeals = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const dealType = query.dealType;
        // Build the query object for filtering based on dealType
        const filter = {};
        if (dealType) {
            filter.dealType = dealType;
        }
        // Fetch deals based on the filter
        const deals = yield deal_model_1.Deal.find(filter).populate("products.productId");
        // If `dealType` is present, extract only the products along with dealStartDate and dealEndDate
        if (dealType) {
            const products = deals.flatMap((deal) => deal.products.map((product) => product.productId));
            // Returning an object with products, dealEndDate, and dealStartDate
            const dealStartDate = (_a = deals[0]) === null || _a === void 0 ? void 0 : _a.dealStartDate;
            const dealEndDate = (_b = deals[0]) === null || _b === void 0 ? void 0 : _b.dealEndDate;
            return { products, dealStartDate, dealEndDate };
        }
        // If no `dealType` filter is present, return the entire deal data
        return deals;
    }
    catch (error) {
        console.error("Error fetching deals:", error.message);
        throw new Error(`Error fetching deals: ${error.message}`);
    }
});
exports.getAllDeals = getAllDeals;
// Get deal by ID
const getDealById = (dealId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield deal_model_1.Deal.findById(dealId).populate("products.productId");
    }
    catch (error) {
        throw new Error(`Error fetching deal: ${error.message}`);
    }
});
exports.getDealById = getDealById;
// Update a deal
const updateDeal = (dealId, dealData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const existingDeal = yield deal_model_1.Deal.findById(dealId).session(session);
        if (!existingDeal) {
            throw new Error("Deal not found.");
        }
        // Fetch associated products
        const productIds = ((_a = dealData.products) === null || _a === void 0 ? void 0 : _a.map((item) => item.productId)) || [];
        const products = yield product_model_1.Product.find({
            _id: { $in: productIds },
        }).session(session);
        // Update products if necessary
        if (dealData.products) {
            yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
                const dealProduct = dealData.products.find(({ productId }) => product._id.equals(productId));
                if (dealProduct) {
                    product.discount = {
                        type: dealData.discountType,
                        value: dealProduct.discount,
                        validFrom: dealData.dealStartDate,
                        validTo: dealData.dealEndDate,
                    };
                    product.isDeal = true;
                    yield product.save({ session });
                }
            })));
        }
        // Update the deal itself
        const updatedDeal = yield deal_model_1.Deal.findByIdAndUpdate(dealId, dealData, {
            new: true,
        }).session(session);
        // Commit the transaction
        yield session.commitTransaction();
        return updatedDeal;
    }
    catch (error) {
        // Rollback transaction on error
        yield session.abortTransaction();
        throw new Error(`Error updating deal: ${error.message}`);
    }
    finally {
        session.endSession();
    }
});
exports.updateDeal = updateDeal;
// Delete a deal
const deleteDeal = (dealId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const deal = yield deal_model_1.Deal.findById(dealId).session(session);
        if (!deal) {
            throw new Error("Deal not found.");
        }
        // Fetch associated products
        const productIds = deal.products.map((item) => item.productId);
        const products = yield product_model_1.Product.find({
            _id: { $in: productIds },
        }).session(session);
        // Reset product deal-related fields
        yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            product.isDeal = false;
            product.discount = undefined;
            yield product.save({ session });
        })));
        // Delete the deal
        yield deal_model_1.Deal.findByIdAndDelete(dealId).session(session);
        // Commit the transaction
        yield session.commitTransaction();
        return { message: "Deal deleted successfully." };
    }
    catch (error) {
        // Rollback transaction on error
        yield session.abortTransaction();
        throw new Error(`Error deleting deal: ${error.message}`);
    }
    finally {
        session.endSession();
    }
});
exports.deleteDeal = deleteDeal;

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
exports.ProductServices = void 0;
const mongoose_1 = require("mongoose");
const globalError_1 = require("../../errors/globalError");
const statusCode_1 = require("../../lib/statusCode");
const sub_category_model_1 = __importDefault(require("../sub-category/sub-category.model"));
const product_model_1 = require("./product.model");
exports.ProductServices = {
    createProduct: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const isExistSubcategory = yield sub_category_model_1.default.exists({
            _id: new mongoose_1.Types.ObjectId(data === null || data === void 0 ? void 0 : data.subCategory),
            category: new mongoose_1.Types.ObjectId(data.category),
        });
        if (!isExistSubcategory) {
            throw new globalError_1.AppError("The specified subcategory does not exist for the given category.", statusCode_1.StatusCodes.BAD_REQUEST);
        }
        const product = new product_model_1.Product(data);
        return yield product.save();
    }),
    updateProductViews: (productId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield product_model_1.Product.findByIdAndUpdate(productId, { $inc: { views: 1 } }, { new: true });
        }
        catch (error) {
            throw new globalError_1.AppError(`Failed to update views: ${error.message}`, statusCode_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }),
    updateProductImages: (productId, images) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield product_model_1.Product.findByIdAndUpdate(productId, { $addToSet: { images: { $each: images } } }, // Add images to the array only if they are unique
            { new: true });
        }
        catch (error) {
            throw new globalError_1.AppError(`Failed to update images: ${error.message}`, statusCode_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }),
    deleteProductImage: (productId, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield product_model_1.Product.findByIdAndUpdate(productId, { $pull: { images: imageUrl } }, // Remove the specific image URL from the array
            { new: true });
        }
        catch (error) {
            throw new globalError_1.AppError(`Failed to delete image: ${error.message}`, statusCode_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }),
    getAllProducts: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_1.Product.find().populate("category").populate("subCategory");
    }),
    getProductById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_1.Product.findById(id).populate("category subCategory reviews");
    }),
    updateProduct: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_1.Product.findByIdAndUpdate(id, data, { new: true });
    }),
    deleteProduct: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_1.Product.findByIdAndUpdate(id, { isActive: false });
    }),
};

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
exports.ProductControllers = void 0;
const statusCode_1 = require("../../lib/statusCode");
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/utils/sendResponse"));
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_service_1.ProductServices.createProduct(req.body);
    (0, sendResponse_1.default)(res, {
        message: "Product created successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.CREATED,
    });
}));
const getAllProducts = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_service_1.ProductServices.getAllProducts();
    (0, sendResponse_1.default)(res, {
        message: "Products fetched successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
const getProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield product_service_1.ProductServices.getProductById(id);
    (0, sendResponse_1.default)(res, {
        message: "Product fetched successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield product_service_1.ProductServices.updateProduct(id, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Product updated successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield product_service_1.ProductServices.deleteProduct(id);
    (0, sendResponse_1.default)(res, {
        message: "Product deleted successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
const viewProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield product_service_1.ProductServices.updateProductViews(id);
    (0, sendResponse_1.default)(res, {
        message: "Product view updated successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
const addProductProductImages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { images } = req.body;
    const response = yield product_service_1.ProductServices.updateProductImages(id, images);
    (0, sendResponse_1.default)(res, {
        message: "updated Product images  successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    viewProduct,
    addProductProductImages,
};

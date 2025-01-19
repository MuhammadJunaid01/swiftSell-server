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
exports.CategoryControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/utils/sendResponse"));
const category_service_1 = require("./category.service");
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield category_service_1.CategoryServices.createCategory(req.body);
    (0, sendResponse_1.default)(res, {
        message: "Category created successfully",
        success: true,
        data: response,
        statusCode: http_status_1.default.CREATED,
    });
}));
const getAllCategories = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield category_service_1.CategoryServices.getAllCategories();
    (0, sendResponse_1.default)(res, {
        message: "Categories fetched successfully",
        success: true,
        data: response,
        statusCode: http_status_1.default.OK,
    });
}));
const getCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield category_service_1.CategoryServices.getCategoryById(id);
    (0, sendResponse_1.default)(res, {
        message: "Category fetched successfully",
        success: true,
        data: response,
        statusCode: http_status_1.default.OK,
    });
}));
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield category_service_1.CategoryServices.updateCategory(id, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Category updated successfully",
        success: true,
        data: response,
        statusCode: http_status_1.default.OK,
    });
}));
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield category_service_1.CategoryServices.deleteCategory(id);
    (0, sendResponse_1.default)(res, {
        message: "Category deleted successfully",
        success: true,
        data: response,
        statusCode: http_status_1.default.OK,
    });
}));
exports.CategoryControllers = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};

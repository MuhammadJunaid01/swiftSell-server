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
const constant_1 = require("../../../shared/constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
const statusCode_1 = require("../../lib/statusCode");
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/utils/sendResponse"));
const category_constant_1 = require("./category.constant");
const category_service_1 = require("./category.service");
//
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield category_service_1.CategoryServices.createCategory(req.body);
    (0, sendResponse_1.default)(res, {
        message: "Category created successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.CREATED,
    });
}));
const createCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield category_service_1.CategoryServices.createCategories();
    (0, sendResponse_1.default)(res, {
        message: "Category created successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.CREATED,
    });
}));
const getAllCategories = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(_req.query, constant_1.paginationOption);
    const filters = (0, pick_1.default)(_req.query, category_constant_1.CategoryFilterableFields);
    console.log("paginationOptions", paginationOptions);
    const response = yield category_service_1.CategoryServices.getAllCategories(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        message: "Categories fetched successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
const getCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield category_service_1.CategoryServices.getCategoryById(id);
    (0, sendResponse_1.default)(res, {
        message: "Category fetched successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield category_service_1.CategoryServices.updateCategory(id, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Category updated successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield category_service_1.CategoryServices.deleteCategory(id);
    (0, sendResponse_1.default)(res, {
        message: "Category deleted successfully",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
exports.CategoryControllers = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    createCategories,
};

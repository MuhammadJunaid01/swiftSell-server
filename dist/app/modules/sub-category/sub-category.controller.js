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
exports.SubCategoryControllers = void 0;
const statusCode_1 = require("../../lib/statusCode");
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/utils/sendResponse"));
const sub_category_service_1 = require("./sub-category.service");
const createSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, name } = req.body;
    const response = yield sub_category_service_1.SubCategoryServices.createSubCategoryIntoDB(categoryId, name);
    (0, sendResponse_1.default)(res, {
        message: "Subcategory created successfully.",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.CREATED,
    });
}));
const getAllSubCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("HEY");
    const response = yield sub_category_service_1.SubCategoryServices.getAllSubCategoriesFromDB();
    (0, sendResponse_1.default)(res, {
        message: "Fetched all subcategories successfully.",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
const getSubCategoriesByCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const response = yield sub_category_service_1.SubCategoryServices.getSubCategoriesByCategoryFromDB(categoryId);
    (0, sendResponse_1.default)(res, {
        message: "Fetched subcategories for the specified category successfully.",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
const updateSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { data } = req.body;
    const response = yield sub_category_service_1.SubCategoryServices.updateSubCategoryIntoDB(id, data);
    (0, sendResponse_1.default)(res, {
        message: "Subcategory updated successfully.",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
const deleteSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield sub_category_service_1.SubCategoryServices.deleteSubCategoryIntoDB(id);
    (0, sendResponse_1.default)(res, {
        message: "Subcategory deleted successfully.",
        success: true,
        data: response,
        statusCode: statusCode_1.StatusCodes.OK,
    });
}));
exports.SubCategoryControllers = {
    createSubCategory,
    getAllSubCategories,
    getSubCategoriesByCategory,
    updateSubCategory,
    deleteSubCategory,
};

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
exports.SubCategoryServices = exports.deleteSubCategoryIntoDB = exports.updateSubCategoryIntoDB = exports.getSubCategoriesByCategoryFromDB = exports.getAllSubCategoriesFromDB = exports.createSubCategoryIntoDB = void 0;
const sub_category_model_1 = __importDefault(require("./sub-category.model"));
const createSubCategoryIntoDB = (categoryId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const subCategory = new sub_category_model_1.default({
        category: categoryId,
        name,
    });
    yield subCategory.save();
    return subCategory;
});
exports.createSubCategoryIntoDB = createSubCategoryIntoDB;
const getAllSubCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // fashionSubcategories.forEach(async ({ name, image }) => {
    //   await new SubCategory({
    //     name: name,
    //     image: image,
    //     category: "67927d11b7838fed7e6e5001",
    //   }).save();
    // });
    // return "lkjkl";
    return yield sub_category_model_1.default.find().populate("category");
});
exports.getAllSubCategoriesFromDB = getAllSubCategoriesFromDB;
const getSubCategoriesByCategoryFromDB = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sub_category_model_1.default.find({ category: categoryId }).exec();
});
exports.getSubCategoriesByCategoryFromDB = getSubCategoriesByCategoryFromDB;
const updateSubCategoryIntoDB = (subCategoryId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedSubCategory = yield sub_category_model_1.default.findByIdAndUpdate(subCategoryId, data, { new: true });
    if (!updatedSubCategory) {
        throw new Error("SubCategory not found.");
    }
    return updatedSubCategory;
});
exports.updateSubCategoryIntoDB = updateSubCategoryIntoDB;
const deleteSubCategoryIntoDB = (subCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedSubCategory = yield sub_category_model_1.default.findByIdAndDelete(subCategoryId);
    if (!deletedSubCategory) {
        throw new Error("SubCategory not found.");
    }
    return deletedSubCategory;
});
exports.deleteSubCategoryIntoDB = deleteSubCategoryIntoDB;
exports.SubCategoryServices = {
    createSubCategoryIntoDB: exports.createSubCategoryIntoDB,
    getAllSubCategoriesFromDB: exports.getAllSubCategoriesFromDB,
    getSubCategoriesByCategoryFromDB: exports.getSubCategoriesByCategoryFromDB,
    updateSubCategoryIntoDB: exports.updateSubCategoryIntoDB,
    deleteSubCategoryIntoDB: exports.deleteSubCategoryIntoDB,
};

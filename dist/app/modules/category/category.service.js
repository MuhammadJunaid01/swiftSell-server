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
exports.CategoryServices = void 0;
const searchHelper_1 = require("../../../helpers/searchHelper");
const data_1 = require("../../lib/data");
const category_constant_1 = require("./category.constant");
const category_model_1 = require("./category.model");
exports.CategoryServices = {
    createCategory: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const category = new category_model_1.Category(data);
        return yield category.save();
    }),
    createCategories: () => __awaiter(void 0, void 0, void 0, function* () {
        data_1.categories.forEach((category) => __awaiter(void 0, void 0, void 0, function* () {
            yield new category_model_1.Category({ name: category.name, image: category.image }).save();
        }));
    }),
    getAllCategories: (filters, pagination) => __awaiter(void 0, void 0, void 0, function* () {
        // await updateIsDeleted();
        const option = (0, searchHelper_1.searchHelper)(filters, pagination, category_constant_1.CategorySearchableFields);
        const result = yield category_model_1.Category.find(option.whereCondition)
            .sort(option.sortCondition)
            .skip(option.skip)
            .limit(option.limit);
        const total = yield category_model_1.Category.countDocuments(option.whereCondition);
        return {
            meta: {
                limit: option.limit,
                page: option.page,
                total,
            },
            data: result,
        };
    }),
    getCategoryById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield category_model_1.Category.findById(id);
    }),
    updateCategory: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield category_model_1.Category.findByIdAndUpdate(id, data, { new: true });
    }),
    deleteCategory: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield category_model_1.Category.findByIdAndDelete(id);
    }),
};
const updateIsDeleted = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all categories from the database
        const categories = yield category_model_1.Category.find({});
        // Iterate over each category and update if isDeleted is undefined
        const updatePromises = categories.map((category) => __awaiter(void 0, void 0, void 0, function* () {
            if (category.isDeleted === undefined) {
                category.isDeleted = false;
                yield category.save();
            }
        }));
        // Wait for all updates to complete
        yield Promise.all(updatePromises);
        console.log("Categories updated successfully.");
    }
    catch (error) {
        console.error("Error updating categories:", error);
    }
});

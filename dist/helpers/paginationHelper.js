"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationHelper = (option) => {
    console.log("option ghgfhgfhgf", option);
    const page = Number(option.page) || 1;
    const limit = Number(option.limit) || 30;
    const skip = (page - 1) * limit;
    const sortBy = option.sortBy || "createdAt";
    const sortOrder = option.sortOrder || "asc";
    return { page, limit, skip, sortBy, sortOrder };
};
exports.paginationHelper = paginationHelper;

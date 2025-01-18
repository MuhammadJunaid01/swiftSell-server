"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealType = exports.CategoryType = void 0;
// Category and Subcategory Types
var CategoryType;
(function (CategoryType) {
    CategoryType["Fashion"] = "fashion";
    CategoryType["Electronics"] = "electronics";
    CategoryType["Appliances"] = "appliances";
    CategoryType["Beauty"] = "beauty";
    CategoryType["Furniture"] = "furniture";
})(CategoryType || (exports.CategoryType = CategoryType = {}));
// Deal Type Enum
var DealType;
(function (DealType) {
    DealType["Day"] = "day";
    DealType["Week"] = "week";
    DealType["Month"] = "month";
})(DealType || (exports.DealType = DealType = {}));

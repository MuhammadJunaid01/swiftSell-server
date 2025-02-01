"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHelper = void 0;
const paginationHelper_1 = require("./paginationHelper");
const searchHelper = (filters, pagination, searcheableFields, customCondition, dateRange, isDeleted) => {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.length) {
        andCondition.push({
            $or: searcheableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    if (dateRange && (dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate) && (dateRange === null || dateRange === void 0 ? void 0 : dateRange.endDate)) {
        // console.log(dateRange, 'this is in')
        andCondition.push({
            createdAt: {
                $gte: dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate,
                $lte: dateRange === null || dateRange === void 0 ? void 0 : dateRange.endDate,
            },
        });
    }
    // Add isDeleted: false to where condition
    // if (!isDeleted) {
    //   andCondition.push({
    //     isDeleted: false,
    //   });
    // }
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.paginationHelper)(pagination);
    if (customCondition) {
        andCondition.push(customCondition);
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    // console.log(andCondition, 'before')
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    // console.log(whereCondition, 'after')
    return {
        whereCondition,
        page,
        limit,
        skip,
        sortCondition: sortCondition,
    };
};
exports.searchHelper = searchHelper;

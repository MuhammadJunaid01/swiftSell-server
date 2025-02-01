"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String, required: false, default: null },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.Category = (0, mongoose_1.model)("Category", CategorySchema);

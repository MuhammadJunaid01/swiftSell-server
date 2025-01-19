"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerSlider = void 0;
const mongoose_1 = require("mongoose");
const BannerSliderSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    redirectUrl: { type: String },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, required: false, unique: true },
}, {
    timestamps: true, // Add createdAt and updatedAt fields
});
exports.BannerSlider = (0, mongoose_1.model)("BannerSlider", BannerSliderSchema);

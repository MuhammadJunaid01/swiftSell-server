"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        required: true,
        enum: ["fashion", "electronics", "appliances", "beauty", "furniture"],
    },
    subCategory: {
        name: { type: String },
        description: { type: String },
    },
    images: { type: [String], required: true },
    ratings: { type: Number, required: true },
    reviews: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Review" }],
    discount: {
        type: {
            type: { type: String, enum: ["percentage", "fixed"] },
            value: { type: Number },
            validFrom: { type: Date },
            validTo: { type: Date },
        },
        required: false,
    },
    inventory: {
        stock: { type: Number, required: true },
        sku: { type: String, required: true },
        warehouseLocation: { type: String },
    },
    isDeal: { type: Boolean, required: true },
    dealType: { type: String, enum: ["day", "week", "month"], required: false },
    dealExpiry: { type: Date },
    tags: { type: [String] },
    shippingDetails: {
        weight: { type: Number, required: true },
        dimensions: {
            length: { type: Number, required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
        },
        shippingClass: {
            type: String,
            enum: ["standard", "express", "priority"],
            required: true,
        },
        deliveryEstimate: { type: String, required: true },
    },
    isActive: { type: Boolean, required: true },
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.default = Product;

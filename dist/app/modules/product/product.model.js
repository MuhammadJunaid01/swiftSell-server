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
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: { type: mongoose_1.Schema.Types.ObjectId, ref: "SubCategory" },
    images: { type: [String], required: true },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    reviews: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Review" }],
    discount: {
        type: {
            type: { type: String, enum: ["percentage", "fixed"], required: true },
            value: { type: Number, required: true },
            validFrom: { type: Date, required: true },
            validTo: { type: Date, required: true },
        },
    },
    inventory: {
        stock: { type: Number, required: true },
        reservedStock: { type: Number, default: 0 },
        sku: { type: String, required: true, unique: true },
        warehouseLocation: { type: String },
    },
    isDeal: { type: Boolean, default: false },
    dealType: { type: String, enum: ["day", "week", "month"] },
    dealExpiry: { type: Date },
    tags: { type: [String], default: [] },
    searchableTags: { type: [String], default: [] },
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
    views: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
// Middleware to validate category existence
ProductSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryExists = yield mongoose_1.default.models.Category.findById(this.category);
        if (!categoryExists) {
            throw new Error("Invalid category ID");
        }
        next();
    });
});
// Middleware to generate a unique product ID
function generateUniqueProductId() {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = Math.floor(10000000 + Math.random() * 90000000).toString();
        const existingProduct = yield mongoose_1.default.models.Product.findOne({
            id: productId,
        });
        if (existingProduct) {
            return generateUniqueProductId();
        }
        return productId;
    });
}
ProductSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.id) {
            this.id = yield generateUniqueProductId();
        }
        next();
    });
});
// Soft delete and filtering for active products
ProductSchema.pre(/^find/, function (next) {
    this.where({ isActive: true });
    next();
});
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);

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
exports.Deal = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dealSchema = new mongoose_1.Schema({
    dealThumbnail: {
        type: String,
        required: [true, "Deal thumbnail is required"],
    },
    dealTitle: {
        type: String,
        required: [true, "Deal title is required"],
        trim: true,
    },
    products: [
        {
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            discount: {
                type: Number,
                required: true,
            },
        },
    ],
    dealStartDate: {
        type: Date,
        required: [true, "Deal start date is required"],
    },
    dealEndDate: {
        type: Date,
        required: [true, "Deal end date is required"],
    },
    discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        required: [true, "Discount type is required"],
    },
    discountValue: {
        type: Number,
        required: [true, "Discount value is required"],
        min: [0, "Discount value cannot be less than 0"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    dealType: {
        type: String,
        enum: ["day", "week", "month", "flashSale"],
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
exports.Deal = (0, mongoose_1.model)("Deal", dealSchema);

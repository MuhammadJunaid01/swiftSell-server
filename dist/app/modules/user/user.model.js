"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
// User schema definition
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String },
    phoneNumber: { type: String },
    gender: {
        type: String,
        enum: user_interface_1.Gender,
        required: false,
        default: user_interface_1.Gender.PreferNotToSay,
    },
    location: { type: String },
    otp: { type: String },
    otpExpiration: { type: Date },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    pushToken: { type: String },
    refreshToken: { type: String },
    role: { type: String, enum: user_interface_1.Role, default: user_interface_1.Role.User },
}, { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const globalError_1 = require("../../errors/globalError");
const utils_1 = require("../../lib/utils");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = __importDefault(require("../user/user.model"));
const registerUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, gender, role } = user;
    // Start a Mongoose session
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Check if the user already exists
        const existingUser = yield user_model_1.default.findOne({ email }).session(session);
        if (existingUser) {
            throw new globalError_1.AppError("User already exists", http_status_1.default.CONFLICT);
        }
        // Generate OTP and set expiration
        const otp = (0, utils_1.generateOtp)();
        const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
        const hashedPassword = yield (0, utils_1.hashPassword)(password); // Create new user
        const newUser = new user_model_1.default({
            name,
            email,
            password: hashedPassword, // Ensure you hash the password before saving
            gender,
            otp,
            otpExpiration,
            isVerified: false,
            role: user_interface_1.Role.Admin,
        });
        // Save the new user within the transaction
        yield newUser.save({ session });
        // Send OTP to user's email
        yield (0, utils_1.sendOtpEmail)(newUser === null || newUser === void 0 ? void 0 : newUser.email, otp, newUser.name);
        // Commit the transaction
        yield session.commitTransaction();
        return "User registered. Please verify your email.";
    }
    catch (error) {
        console.log("err", error);
        // Abort the transaction in case of an error
        yield session.abortTransaction();
        if (error instanceof globalError_1.AppError) {
            throw error; // Re-throw custom AppError
        }
        else {
            // Throw a generic AppError for unexpected errors
            throw new globalError_1.AppError("An unexpected error occurred", http_status_1.default.INTERNAL_SERVER_ERROR);
        }
    }
    finally {
        // End the session
        session.endSession();
    }
});
const verifyOtpIntoDB = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user by email
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new globalError_1.AppError("User not found", http_status_1.default.NOT_FOUND);
    }
    // Check if OTP is valid
    if (user.otp !== otp) {
        throw new globalError_1.AppError("Invalid OTP", http_status_1.default.BAD_REQUEST);
    }
    // Check if OTP has expired
    if (!user.otpExpiration || user.otpExpiration < new Date()) {
        throw new globalError_1.AppError("'OTP has expired", http_status_1.default.BAD_REQUEST);
    }
    // Update user's isVerified status
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiration = undefined;
    yield user.save();
    const accessToken = (0, utils_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id.toString(), user.role);
    const refreshToken = yield (0, utils_1.generateRefreshToken)(user === null || user === void 0 ? void 0 : user._id);
    return {
        accessToken,
        refreshToken,
        user: user.toJSON(),
    };
});
const loginUserIntoDB = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user by email
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new globalError_1.AppError("User not found", http_status_1.default.NOT_FOUND);
    }
    // Check if user is verified
    if (!user.isVerified) {
        // Delete the unverified user
        yield user_model_1.default.deleteOne({ email });
        throw new globalError_1.AppError("Email not verified. User has been removed.", http_status_1.default.UNAUTHORIZED);
    }
    console.log("user.password", user.password);
    // Compare passwords
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new globalError_1.AppError("Invalid credentials", http_status_1.default.UNAUTHORIZED);
    }
    // Generate tokens after login
    const accessToken = (0, utils_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.role);
    const refreshToken = yield (0, utils_1.generateRefreshToken)(user === null || user === void 0 ? void 0 : user._id);
    // Return user without password
    const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
    return {
        accessToken,
        refreshToken,
        user: userWithoutPassword,
    };
});
const refreshAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (!refreshToken) {
        throw new globalError_1.AppError("Refresh token is required", 400);
    }
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    }
    catch (error) {
        throw new globalError_1.AppError("Invalid or expired refresh token", 401);
    }
    const { userId } = decoded;
    const user = yield user_model_1.default.findById(userId);
    if (!user || user.refreshToken !== refreshToken) {
        throw new globalError_1.AppError("Invalid or expired refresh token", 401);
    }
    // Generate new access token
    const newAccessToken = (0, utils_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id, user.role);
    return {
        user: user.toObject(),
        accessToken: newAccessToken,
    };
});
const logoutUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user by ID
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new globalError_1.AppError("User not found", http_status_1.default.NOT_FOUND);
        }
        // Invalidate the refresh token by removing it
        user.refreshToken = "";
        yield user.save({ validateBeforeSave: true });
        return "User logged out successfully";
    }
    catch (error) {
        console.error("Logout error:", error);
        if (error instanceof globalError_1.AppError) {
            throw error; // Re-throw custom AppError
        }
        throw new globalError_1.AppError("An unexpected error occurred during logout", http_status_1.default.INTERNAL_SERVER_ERROR);
    }
});
exports.AuthServices = {
    registerUserIntoDB,
    verifyOtpIntoDB,
    loginUserIntoDB,
    refreshAccessToken,
    logoutUserFromDB,
};

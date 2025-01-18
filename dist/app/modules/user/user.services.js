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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const globalError_1 = require("../../errors/globalError");
const user_model_1 = __importDefault(require("./user.model"));
const updateUserIntoDB = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_model_1.default.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(userId) }, { $set: user }, { new: true, runValidators: true });
        if (!updatedUser) {
            throw new Error("User Not found.");
        }
        return updatedUser;
    }
    catch (error) {
        throw new globalError_1.AppError(`Error updating user: ${error.message}`, http_status_1.default.INTERNAL_SERVER_ERROR);
    }
});
exports.UserServices = { updateUserIntoDB };

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
exports.UserControllers = void 0;
const statusCode_1 = require("../../lib/statusCode");
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/utils/sendResponse"));
const user_services_1 = require("./user.services");
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user } = req.body;
    const response = yield user_services_1.UserServices.updateUserIntoDB(id, user);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "successfully user  updated ",
        statusCode: statusCode_1.StatusCodes.OK,
        data: response,
    });
}));
exports.UserControllers = { updateUser };

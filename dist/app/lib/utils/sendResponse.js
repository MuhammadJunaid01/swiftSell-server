"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, { statusCode, message, success, data }) => {
    return res.status(statusCode).json({ success, message, data, statusCode });
};
exports.default = sendResponse;

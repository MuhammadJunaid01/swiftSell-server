"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectDevice = void 0;
const useragent_1 = __importDefault(require("useragent")); // Import useragent
const detectDevice = (req, res, next) => {
    const agent = useragent_1.default.parse(req.headers["user-agent"]);
    const deviceType = agent.device.toString(); // Get device type
    if (deviceType === "Mobile") {
        req.deviceType = "mobile";
    }
    else if (deviceType === "Tablet") {
        req.deviceType = "tablet";
    }
    else {
        req.deviceType = "desktop";
    }
    next();
};
exports.detectDevice = detectDevice;

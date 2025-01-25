"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const globalError_1 = require("./app/errors/globalError");
const detectDevice_1 = require("./app/middlewares/detectDevice");
const logger_1 = __importDefault(require("./app/middlewares/logger"));
const routes_1 = __importDefault(require("./app/routes"));
const morganFormat = ":method :url :status :response-time ms";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(" ")[0],
                url: message.split(" ")[1],
                status: message.split(" ")[2],
                responseTime: message.split(" ")[3],
            };
            logger_1.default.info(JSON.stringify(logObject));
        },
    },
}));
// Use the device detection middleware
app.use(detectDevice_1.detectDevice);
app.use("/api/v1", routes_1.default);
app.use(globalError_1.errorHandler);
app.get("/", (req, res) => {
    res.send("no sql server running........");
});
app.get("*", (req, res) => {
    res
        .status(404)
        .json({ success: false, message: `${req.url} route not found` });
});
exports.default = app;

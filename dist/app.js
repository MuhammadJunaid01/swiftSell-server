"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const globalError_1 = require("./app/errors/globalError");
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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

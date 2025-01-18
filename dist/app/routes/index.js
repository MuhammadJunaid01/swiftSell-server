"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const modules = [
    { path: "/auth", route: auth_route_1.authRouter },
    { path: "/user", route: user_route_1.userRouter },
];
modules.forEach(({ path, route }) => router.use(path, route));
exports.default = router;

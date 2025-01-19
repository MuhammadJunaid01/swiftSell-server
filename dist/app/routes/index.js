"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const category_route_1 = require("../modules/category/category.route");
const order_route_1 = require("../modules/order/order.route");
const product_route_1 = require("../modules/product/product.route");
const sub_category_route_1 = require("../modules/sub-category/sub-category.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const modules = [
    { path: "/auth", route: auth_route_1.authRouter },
    { path: "/user", route: user_route_1.userRouter },
    { path: "/category", route: category_route_1.categoryRouter },
    { path: "/category/sub-category", route: sub_category_route_1.subCategoryRouter },
    { path: "/product", route: product_route_1.productRouter },
    { path: "/order", route: order_route_1.orderRouter },
];
modules.forEach(({ path, route }) => router.use(path, route));
exports.default = router;

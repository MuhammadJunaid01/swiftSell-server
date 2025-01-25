"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const bannerSlider_route_1 = require("../modules/bannerSlider/bannerSlider.route");
const cart_route_1 = require("../modules/cart/cart.route");
const category_route_1 = require("../modules/category/category.route");
const deal_route_1 = require("../modules/deal/deal.route");
const order_route_1 = require("../modules/order/order.route");
const payment_route_1 = require("../modules/payment/payment.route");
const product_route_1 = require("../modules/product/product.route");
const returnRequest_routes_1 = require("../modules/return.order/returnRequest.routes");
const review_route_1 = require("../modules/review/review.route");
const shipping_info_route_1 = require("../modules/shipping.info/shipping.info.route");
const sub_category_route_1 = require("../modules/sub-category/sub-category.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const modules = [
    { path: "/auth", route: auth_route_1.authRouter },
    { path: "/user", route: user_route_1.userRouter },
    { path: "/category", route: category_route_1.categoryRouter },
    { path: "/category", route: sub_category_route_1.subCategoryRouter },
    { path: "/product", route: product_route_1.productRouter },
    { path: "/cart", route: cart_route_1.cartRouter },
    { path: "/order", route: order_route_1.orderRouter },
    { path: "/review", route: review_route_1.reviewRouter },
    { path: "/banner-sliders", route: bannerSlider_route_1.bannerSliderRoutes },
    { path: "/deals", route: deal_route_1.dealRoutes },
    { path: "/payment", route: payment_route_1.paymentRouter },
    { path: "/shipping-info", route: shipping_info_route_1.shippingInfoRouter },
    { path: "/return-request", route: returnRequest_routes_1.returnRequestRoutes },
];
modules.forEach(({ path, route }) => router.use(path, route));
exports.default = router;

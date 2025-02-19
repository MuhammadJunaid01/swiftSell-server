import { Router } from "express";
import { IRoute } from "../interfaces";
import { authRouter } from "../modules/auth/auth.route";
import { bannerSliderRoutes } from "../modules/bannerSlider/bannerSlider.route";
import { cartRouter } from "../modules/cart/cart.route";
import { categoryRouter } from "../modules/category/category.route";
import { dealRoutes } from "../modules/deal/deal.route";
import { invoiceRouter } from "../modules/invoice/invoice.route";
import { orderRouter } from "../modules/order/order.route";
import { paymentRouter } from "../modules/payment/payment.route";
import { productRouter } from "../modules/product/product.route";
import { returnRequestRoutes } from "../modules/return.order/returnRequest.routes";
import { reviewRouter } from "../modules/review/review.route";
import { shippingInfoRouter } from "../modules/shipping.info/shipping.info.route";
import { subCategoryRouter } from "../modules/sub-category/sub-category.route";
import { userRouter } from "../modules/user/user.route";
const router = Router();

const modules: IRoute[] = [
  { path: "/auth", route: authRouter },
  { path: "/user", route: userRouter },
  { path: "/category", route: categoryRouter },
  { path: "/category", route: subCategoryRouter },
  { path: "/product", route: productRouter },
  { path: "/cart", route: cartRouter },
  { path: "/order", route: orderRouter },
  { path: "/review", route: reviewRouter },
  { path: "/banner-sliders", route: bannerSliderRoutes },
  { path: "/deals", route: dealRoutes },
  { path: "/payment", route: paymentRouter },
  { path: "/shipping-info", route: shippingInfoRouter },
  { path: "/return-request", route: returnRequestRoutes },
  { path: "/invoice", route: invoiceRouter },
];
modules.forEach(({ path, route }) => router.use(path, route));

export default router;

import { Router } from "express";
import { IRoute } from "../interfaces";
import { authRouter } from "../modules/auth/auth.route";
import { bannerSliderRoutes } from "../modules/bannerSlider/bannerSlider.route";
import { cartRouter } from "../modules/cart/cart.route";
import { categoryRouter } from "../modules/category/category.route";
import { orderRouter } from "../modules/order/order.route";
import { productRouter } from "../modules/product/product.route";
import { subCategoryRouter } from "../modules/sub-category/sub-category.route";
import { userRouter } from "../modules/user/user.route";
const router = Router();

const modules: IRoute[] = [
  { path: "/auth", route: authRouter },
  { path: "/user", route: userRouter },
  { path: "/category", route: categoryRouter },
  { path: "/category/sub-category", route: subCategoryRouter },
  { path: "/product", route: productRouter },
  { path: "/cart", route: cartRouter },
  { path: "/order", route: orderRouter },
  { path: "/banners", route: bannerSliderRoutes },
];
modules.forEach(({ path, route }) => router.use(path, route));

export default router;

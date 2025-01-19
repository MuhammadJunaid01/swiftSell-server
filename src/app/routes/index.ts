import { Router } from "express";
import { IRoute } from "../interfaces";
import { authRouter } from "../modules/auth/auth.route";
import { subCategoryRouter } from "../modules/sub-category/sub-category.route";
import { userRouter } from "../modules/user/user.route";
const router = Router();

const modules: IRoute[] = [
  { path: "/auth", route: authRouter },
  { path: "/user", route: userRouter },
  { path: "/category/sub-category", route: subCategoryRouter },
];
modules.forEach(({ path, route }) => router.use(path, route));

export default router;

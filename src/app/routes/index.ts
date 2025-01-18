import { Router } from "express";
import { IRoute } from "../interfaces";
import { authRouter } from "../modules/auth/auth.route";
import { userRouter } from "../modules/user/user.route";
const router = Router();

const modules: IRoute[] = [
  { path: "/auth", route: authRouter },
  { path: "/user", route: userRouter },
];
modules.forEach(({ path, route }) => router.use(path, route));

export default router;

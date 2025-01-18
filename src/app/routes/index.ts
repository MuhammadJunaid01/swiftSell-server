import { Router } from "express";
import { authRouter } from "../auth/auth.route";
import { IRoute } from "../interfaces";
const router = Router();

const modules: IRoute[] = [{ path: "/auth", route: authRouter }];
modules.forEach(({ path, route }) => router.use(path, route));

export default router;

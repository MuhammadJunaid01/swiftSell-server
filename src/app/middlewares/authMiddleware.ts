import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../app/config";

import { CustomRequest } from "../../app/interfaces";
import { AppError } from "../errors/globalError";
import catchAsync from "../lib/utils/catchAsync";
import User from "../modules/user/user.model";
type UserRole = "admin" | "user";

const authGuard = (...roles: UserRole[]) => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        throw new AppError(" you are not authorized ", httpStatus.UNAUTHORIZED);
      }
      const token = authorizationHeader.split(" ")[1];
      const decoded = jwt.verify(token, config.secret as string) as JwtPayload;

      if (!decoded) {
        throw new AppError(
          "You have no access to this route",
          httpStatus.UNAUTHORIZED
        );
      }
      const { userId, role } = decoded;
      if (roles && roles.length > 0 && !roles.includes(role)) {
        throw new AppError(
          "You have no access to this route",
          httpStatus.UNAUTHORIZED
        );
      }
      const isUserExist = await User.findOne({ _id: userId });
      if (!isUserExist) {
        throw new AppError("user not found", httpStatus.NOT_FOUND);
      }
      req.user = userId;
      next();
    }
  );
};
export default authGuard;

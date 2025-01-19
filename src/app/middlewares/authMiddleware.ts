import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../app/config";

import { CustomRequest } from "../../app/interfaces";
import { AppError } from "../errors/globalError";
import catchAsync from "../lib/utils/catchAsync";
import { Role } from "../modules/user/user.interface";
import User from "../modules/user/user.model";

const authGuard = (...roles: Role[]) => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const authorizationHeader = req.headers.authorization;

      // Check if authorization header is provided and starts with "Bearer"
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        throw new AppError(
          "Authorization header is missing or improperly formatted. Please provide a valid token.",
          httpStatus.UNAUTHORIZED
        );
      }

      const token = authorizationHeader.split(" ")[1];

      // Verify token
      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(token, config.secret as string) as JwtPayload;
      } catch (error) {
        throw new AppError(
          "Invalid or expired token. Please login again to obtain a valid token.",
          httpStatus.UNAUTHORIZED
        );
      }

      const { userId, role } = decoded;
      console.log("role", role);
      // Allow admin to access all routes
      if (role === Role.Admin) {
        req.user = userId;
        return next();
      }

      // Check if the user's role is allowed to access the route
      if (roles.length > 0 && !roles.includes(role)) {
        throw new AppError(
          `Access denied. This route is restricted to roles: ${roles.join(
            ", "
          )}.`,
          httpStatus.FORBIDDEN
        );
      }

      // Check if the user exists in the database
      const isUserExist = await User.findOne({ _id: userId });
      if (!isUserExist) {
        throw new AppError(
          "The user associated with this token does not exist. Please ensure your account is active.",
          httpStatus.NOT_FOUND
        );
      }

      req.user = userId;
      next();
    }
  );
};

export default authGuard;

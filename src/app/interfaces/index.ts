import { Request, Router } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";

export type TErrorReturnType = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource[];
};

export type TErrorSource = {
  path: string | number;
  message: string;
};

export interface CustomRequest extends Request {
  user: JwtPayload & IUser;
}
export interface IRoute {
  path: string;
  route: Router;
}

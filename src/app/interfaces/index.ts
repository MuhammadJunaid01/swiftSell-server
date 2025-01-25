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
type DeviceType = "mobile" | "tablet" | "desktop";
export interface CustomRequest extends Request {
  user: JwtPayload & IUser;
  deviceType?: DeviceType;
}
export interface IRoute {
  path: string;
  route: Router;
}
export interface IPaginationOption {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
export interface IDateRangeFilters {
  startDate: Date;
  endDate: Date;
  by?: string;
}
export interface IGenericResponse<T> {
  statusCode?: number;
  success?: boolean;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data?: T;
  message?: string;
}

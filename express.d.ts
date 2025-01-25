import { DeviceType } from "./src/app/modules/product/product.interface";
import { IUser } from "./src/app/modules/user/user.interface";
// types/express.d.ts

declare global {
  namespace Express {
    interface Request {
      deviceType?: DeviceType;
      user?: IUser;
    }
  }
}

export {}; // This is needed to convert this file into a module

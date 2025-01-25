import { NextFunction, Request, Response } from "express";
import useragent from "useragent"; // Import useragent

export const detectDevice = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const agent = useragent.parse(req.headers["user-agent"]);
  const deviceType = agent.device.toString(); // Get device type

  if (deviceType === "Mobile") {
    req.deviceType = "mobile";
  } else if (deviceType === "Tablet") {
    req.deviceType = "tablet";
  } else {
    req.deviceType = "desktop";
  }

  next();
};

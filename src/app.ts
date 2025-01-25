import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import { errorHandler } from "./app/errors/globalError";
import { detectDevice } from "./app/middlewares/detectDevice";
import logger from "./app/middlewares/logger";
import router from "./app/routes";

const morganFormat = ":method :url :status :response-time ms";
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
// Use the device detection middleware
app.use(detectDevice);
app.use("/api/v1", router);
app.use(errorHandler);
app.get("/", (req: Request, res: Response) => {
  res.send("no sql server running........");
});
app.get("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, message: `${req.url} route not found` });
});
export default app;

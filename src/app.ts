import cors from "cors";
import express, { Application, Request, Response } from "express";
import { errorHandler } from "./app/errors/globalError";
import router from "./app/routes";
const app: Application = express();
app.use(express.json());
app.use(cors());
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

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL_LOCAL,
  secret: process.env.SECRET_TOKEN,
  secret_refresh: process.env.SECRET_REFRESH,
};

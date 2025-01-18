import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
const databaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL_LOCAL;
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: databaseUrl,
  secret: process.env.SECRET_TOKEN,
  secret_refresh: process.env.SECRET_REFRESH,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
};

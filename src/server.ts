/* eslint-disable */
import mongoose from "mongoose";

import app from "./app";
import config from "./app/config";

const main = async () => {
  try {
    const dbUri = config.database_url;
    if (!dbUri) {
      throw new Error("Database URL is not defined.");
    }

    await mongoose.connect(dbUri, {
      serverSelectionTimeoutMS: 5000, // Increase timeout (in milliseconds)
    });

    app.listen(config.port, () => {
      //disable-eslint
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    // console.error('Error during MongoDB connection setup:', error);

    process.exit(1);
  }
};

main();

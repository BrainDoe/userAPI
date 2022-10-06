import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function dbConnect() {
  const dbUri = config.get<string>("dbUri");

  try {
    const conn = await mongoose.connect(dbUri);
    log.info("Connected to Mongo database");
  } catch (error) {
    process.exit(1);
  }
}

export default dbConnect;
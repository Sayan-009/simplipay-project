import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectMongoDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`MongoDB connected !!`);
    console.log("HOST:", connectionInstance.connection.host);
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR", error);
    process.exit(1);
  }
};

export default connectMongoDB;
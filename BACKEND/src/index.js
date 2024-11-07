import dotenv from "dotenv";
import app from "./app.js";
import connectMongoDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectMongoDB()
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(PORT, () => {
      console.log(`server is listen on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });

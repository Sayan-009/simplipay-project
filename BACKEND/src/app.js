import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import router from "./routes/user.route.js";
import transactionRouter from "./routes/transaction.route.js";

app.use("/api/v1/users", router);
app.use("/api/v1/transaction", transactionRouter);

export default app;

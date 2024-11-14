import Router from "express";
import authController from "../controllers/auth.controller.js";
import addMoney from "../controllers/transactionController/addMoney.controller.js";
import sendMoney from "../controllers/transactionController/sendMoney.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import transactionHistory from "../controllers/transactionController/transactionHistory.controller.js";

const transactionRouter = Router();

transactionRouter.route("/add-money-section").get(verifyJWT, authController);

transactionRouter.route("/send-money-section").get(verifyJWT, authController);

transactionRouter.route("/add-money").post(verifyJWT, addMoney);

transactionRouter.route("/send-money").post(verifyJWT, sendMoney);

transactionRouter
  .route("/get-transaction-history")
  .get(verifyJWT, transactionHistory);

export default transactionRouter;

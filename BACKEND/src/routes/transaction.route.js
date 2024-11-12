import Router from "express";
import authController from "../controllers/auth.controller.js";
import addMoney from "../controllers/transactionController/addMoney.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const transactionRouter = Router();

transactionRouter.route("/add-money-section").get(verifyJWT, authController);

transactionRouter.route("/send-money-section").get(verifyJWT, authController);

transactionRouter.route("/add-money").post(verifyJWT, addMoney);

export default transactionRouter;

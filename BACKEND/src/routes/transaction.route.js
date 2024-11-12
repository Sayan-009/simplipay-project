import Router from "express";
import authController from "../controllers/auth.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const transactionRouter = Router();

transactionRouter.route("/add-money").get(verifyJWT, authController);

export default transactionRouter;

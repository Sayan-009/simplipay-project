import { Router } from "express";
import {
  userRegister,
  userLogin,
  userLogout,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import userNotification from "../controllers/notification.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import multer from "multer";

const image = multer()

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), userRegister);

router.route("/login").post(image.none(), userLogin);

router.route("/logout").post(verifyJWT, userLogout);

router.route("/get-access-token").get(refreshAccessToken);

router.route("/get-notification").get(verifyJWT, userNotification);

export default router;

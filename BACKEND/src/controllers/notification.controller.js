import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { User } from "../models/User.model.js";
import { Notification } from "../models/Notificaton.model.js";

const userNotification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new apiError(400, "User not found");
  }

  const notifications = await Notification.find({ userID: user._id }).sort({
    timestamp: -1,
  });

  return res
    .status(200)
    .json(
      new apiResponse(200, notifications, "notification fetch successfully")
    );
});

export default userNotification;

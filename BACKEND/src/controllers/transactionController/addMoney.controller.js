import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import { User } from "../../models/User.model.js";
import { Notification } from "../../models/Notificaton.model.js";

const addMoney = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new apiResponse("400", "user not found");
  }
  const { amount, password } = req.body;
  if (
    [amount, password].some((field) => {
      return field === undefined || field === null;
    })
  ) {
    throw new apiError(400, "all fields are required");
  }

  if (amount === 0) {
    throw new apiError(400, "minimum amount not be considered");
  }

  const passwordMatch = await user.isPasswordCorrect(password);
  if (!passwordMatch) {
    throw new apiError("400", "password is incorrect");
  }

  const result = await User.findByIdAndUpdate(
    user._id,
    { $inc: { balance: amount } },
    { new: true }
  ).select("-password -refreshToken");

  const message = `Deposit of ${amount} to your bank account was completed successfully`;

  if (!result) {
    message = `Your deposit of ${amount} to your bank account failed. Please try again`;
  }

  const notification = await Notification.create({
    userID: user.id,
    message,
  });

  if (result) {
    return res
      .status(200)
      .json(new apiResponse(200, result, "amount deposited successfully"));
  }
});

export default addMoney;

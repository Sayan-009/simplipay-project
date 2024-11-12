import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const authController = asyncHandler(async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json(new apiResponse(200, user, "User autheticated successfully"));
});


export default authController;

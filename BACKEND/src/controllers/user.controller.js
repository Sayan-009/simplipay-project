import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";

const userRegister = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (
    [fullName, email, password].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new apiError(400, "all fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new apiError(408, "user allready exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new apiError(400, "avatar upload failed");
  }

  const upiId = crypto.randomBytes(10).toString("hex") + "@spay";

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: avatar.url,
    upiId,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "can't create user");
  }

  return res
    .status(201)
    .json(new apiResponse(201, createdUser, "user registered successfully"));
});

export { userRegister };

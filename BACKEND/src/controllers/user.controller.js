import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";
import fs from "fs";

const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "Something went wrong while creating access and refresh token"
    );
  }
};

const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  let avatarLocalPath;

  if (
    [fullName, email, password].some((field) => {
      return field?.trim() === "" || field?.trim() === undefined;
    })
  ) {
    if (req.files.avatar !== undefined) {
      avatarLocalPath = req.files?.avatar[0]?.path;
      fs.unlinkSync(avatarLocalPath);
    }
    throw new apiError(400, "all fields are required");
  }

  if (req.files.avatar === undefined || req.files.avatar.length === 0) {
    throw new apiError(400, "avatar is required");
  }

  avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "avatar is required");
  }

  const existedUser = await User.findOne({
    email,
  });

  if (existedUser) {
    throw new apiError(408, "user allready exist");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new apiError(400, "avatar upload failed");
  }

  const upiId = Math.floor(1000000000 + Math.random() * 9000000000) + "@spay";

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

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (
    [email, password].some((field) => {
      return field?.trim() === "" || field?.trim() === undefined;
    })
  ) {
    throw new apiError(401, "all login credentials are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new apiError(401, "invalid email or password");
  }

  const isMatchUser = await user.isPasswordCorrect(password);
  if (!isMatchUser) {
    throw new apiError(401, "password is wrong");
  }

  const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
    user._id
  );

  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: loggedUser,
          accessToken,
          refreshToken,
        },
        "user logged in successfully"
      )
    );
});

const userLogout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  if (!user) {
    return res.status(404).send("User  not found or already logged out");
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "user logged out successfully"));
});

export { userRegister, userLogin, userLogout };

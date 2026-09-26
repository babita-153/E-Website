import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  getAccessToken,
  getRefreshToken,
  verifyRefreshToken,
} from "../utils/auth.util.js";
import { decode } from "jsonwebtoken";



//REGISTER
const registerController = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "confirm password not match",
    });
  }
  let isExistUser = await userModel.findOne({ email });
  if (isExistUser) {
    return res.status(400).json({
      message: "user already exist with this email",
    });
  }
  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 10),
  });
  let accessToken = getAccessToken({ userId: user._id });
  let refreshToken = getRefreshToken({ userId: user._id });

  await userModel.findByIdAndUpdate(user._id, { refreshToken });
  res.cookie("refreshToken", refreshToken, { httpOnly: true,
  secure: true,
  sameSite: "none", });
  res.status(201).json({
    message: "user registered successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      accessToken,
    },
  });
};



//LOGIN
const loginController = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "envalid email or passwod",
    });
  }
  let isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
  const accessToken = getAccessToken({ userId: user._id });
  const newRefreshToken = getRefreshToken({ userId: user._id });

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken: newRefreshToken,
  });

  res.cookie("refreshToken", newRefreshToken, {  httpOnly: true,
  secure: true,
  sameSite: "none", });
  res.status(200).json({
    message: "user logged In successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      accessToken,
    },
  });
};


//REFRESH
const refreshController = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(400).json({
      message: "refresh token required",
    });
  }

  try {
    let decoded = verifyRefreshToken(refreshToken);
    let { userId } = decoded;
    let user = await userModel.findById(userId);
    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });
      return res.status(400).json({
        message: "Invalid refresh token",
      });
    }
    const newAccessToken = getAccessToken({ userId: user._id });
    const newRefreshToken = getRefreshToken({ userId: user._id });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });
    res.cookie("refreshToken", newRefreshToken, {  httpOnly: true,
  secure: true,
  sameSite: "none", });

    res.status(200).json({
      message: "token refresh successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    console.log("refresh",error);
    return res.status(400).json({
      message: "Invalid refresh token",
    });
  }
};

//LOGOUT
const logoutController = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(400).json({
      message: "refresh token is required",
    });
  }
  try {
    const decoded = verifyRefreshToken(refreshToken);
    let { userId } = decoded;
    await userModel.findByIdAndUpdate(userId, {
      refreshToken: null,
    });

    res.status(200).json({
      message: "logout user",
    });
  } catch (error) {
    return res.status(400).json({
      message: "refresh token expired",
    });
  }
};


//GET ME
const getMeController = async (req, res) => {
  const { userId } = req.user;
  const user = await userModel.findById(userId);
  res.status(200).json({
    message: "user fetched successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    },
  });
};

export {
  registerController,
  loginController,
  refreshController,
  getMeController,
  logoutController,
};

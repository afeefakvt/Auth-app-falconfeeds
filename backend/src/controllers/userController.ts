import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/password";
import { User } from "../models/user";
import { HTTP_STATUS } from "../constants/httpStatus";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {    
    const { firstName,lastName, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "registration failed", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {      
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid email " });
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {      
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Invalid password" });
      return;
    }

    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
    });
    
    if (!accessToken) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "user not found" });
      return;
    }

    const refreshToken = generateRefreshToken({ id: user._id });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // remove password before sending user
    const { password: _, ...safeUser } = user.toObject();
    res.status(HTTP_STATUS.OK).json({ message: "Login Successful", accessToken, user:safeUser });
    return;
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Login failed", error });
    return;
  }
};

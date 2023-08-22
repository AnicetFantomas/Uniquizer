import responseHandler from "../constants/responseHandler";
import User from "../database/models/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    passwordConfirmation,
  } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return responseHandler.ConflictResponse(
        res,
        "User with this mail already exists"
      );
    }

    const passwordRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    );
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if (!passwordRegex.test(password)) {
      return responseHandler.BadRequestResponse(
        res,
        "Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character"
      );
    }

    if (!emailRegex.test(email)) {
      return responseHandler.BadRequestResponse(res, "Invalid email");
    }

    if (password !== passwordConfirmation) {
      return responseHandler.BadRequestResponse(res, "Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPasswordConfirmation = await bcrypt.hash(
      passwordConfirmation,
      10
    );

    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      passwordConfirmation: hashedPasswordConfirmation,
    });

    await newUser.save();

    const protectUserPassword = { ...newUser._doc };
    delete protectUserPassword.password;
    delete protectUserPassword.passwordConfirmation;

    return responseHandler.SuccessResponse(
      res,
      protectUserPassword,
      "User registered successfully"
    );
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return responseHandler.ServerErrorResponse(
      res,
      "An error occurred during registration. Please try again later."
    );
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return responseHandler.NotFoundResponse(res, "User not found");
    }

    const isPasswordValid = bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      return responseHandler.BadRequestResponse(res, "Invalid password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const protectUserPassword = { ...user._doc };
    delete protectUserPassword.password;

    return responseHandler.SuccessResponse(
      res,
      { user: protectUserPassword, token },
      "User logged in successfully"
    );
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return responseHandler.ServerErrorResponse(
      res,
      "An error occurred during login. Please try again later."
    );

    return responseHandler.BadRequestResponse(
      res,
      "Invalid JSON data in the request body"
    );
  }
};

// const logout = (req: Request, res: Response) => {
//   try {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error('Session destroy failed', err);
//         return res.status(500).json({ error: 'An error occurred during logout' });
//       }
//     });

//     res.clearCookie('')

//     return res.status(200).json({ message: 'Successfully logged out' });

//   } catch (error) {

//   }
// }

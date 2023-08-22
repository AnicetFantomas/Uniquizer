import responseHandler from "../constants/responseHandler";
import User from "../database/models/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

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

import responseHandler from "../constants/responseHandler";
import User from "../database/models/userModel";
import bcrypt from "bcrypt";

export const register = async (req: any, res: any, next: any) => {
  const { username, phoneNumber, email, password, password_confirmation } =
    req.body;

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
      return responseHandler.BadRequestResponse(res, "Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character");
    }

    if (!emailRegex.test(email)) {
      return responseHandler.BadRequestResponse(res, "Invalid email");  
    }

    if (password !== password_confirmation) {
      return responseHandler.BadRequestResponse(res, "Passwords do not match");
    }

    
  } catch (error) {
    next(error);
  }
};

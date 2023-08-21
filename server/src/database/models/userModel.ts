import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  _doc: any;
  firstName: string;
  phoneNumber: string;
  lastName: string;
  email: string;
  password?: string; // Make the property optional by adding `?`
  passwordConfirmation?: string;
  isVerified: boolean;
}

const userShema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
      trim: true,
      regexp: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    password: {
      type: String,
      required: true,
      minleght: 8,
      select: false,
      regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    },
    passwordConfirmation: {
      type: String,
      required: true,
      select: false,
    }, 
    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userShema);

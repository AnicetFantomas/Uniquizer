import mongoose from "mongoose";

interface User extends mongoose.Document {
  username: string;
  email: string;
  password?: string; // Make the property optional by adding `?`
}

const userShema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
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
    password_confirmation: {
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

export default mongoose.model("User", userShema);

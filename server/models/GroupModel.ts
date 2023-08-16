import mongoose from "mongoose";

interface User extends mongoose.Document {
  username: string;
  email: string;
  password?: string; // Make the property optional by adding `?`
}

const userShema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contributionAmount: {
      type: Number,
      required: true,
    },
    PayoutRules: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Group", userShema);

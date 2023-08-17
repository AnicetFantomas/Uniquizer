import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contributionSchema = new Schema(
  {
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    group: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contribution", contributionSchema);
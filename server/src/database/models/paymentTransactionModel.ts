import mongoose from "mongoose";

const paymentTransaction = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending",
    }
}, {
    timestamps: true,
}) 

export default mongoose.model("PaymentTransaction", paymentTransaction);
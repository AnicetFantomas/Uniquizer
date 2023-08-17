import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type : String,
        required: true,
    },
    status: {
        type: String,
        enum: ["unread", "read"],
        default: "unread",
    }
})
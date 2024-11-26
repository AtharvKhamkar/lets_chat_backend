import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    roomId: {
      type: String,
      ref: "Room",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    messageType: {
      type: String,
      required: true,
      default: "TEXT",
      enum: ["TEXT", "IMAGE", "FILE"],
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);

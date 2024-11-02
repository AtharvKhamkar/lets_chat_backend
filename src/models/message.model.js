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

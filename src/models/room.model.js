import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
    {
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref:"User"
            }
        ]
    },
    {
        timestamps:true
    }
)

export const Room = mongoose.model('Room', roomSchema);
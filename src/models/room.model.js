import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
    {
        roomId:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        senderId:{
            type:Schema.Types.ObjectId,
            ref:"User"

        },
        receiverId:{
            type:Schema.Types.ObjectId,
            ref:"User"

        },
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref:"Message"
            }
        ]
    },
    {
        timestamps:true
    }
)

export const Room = mongoose.model('Room', roomSchema);
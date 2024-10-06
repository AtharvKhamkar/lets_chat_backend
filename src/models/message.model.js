import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        roomId: {
            type: Schema.Types.ObjectId,
            ref:"Room"
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
        
    },
    {
        timestamps:true
    }
)

export const Message = mongoose.model('Message', messageSchema);
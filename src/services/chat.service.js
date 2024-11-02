import mongoose from "mongoose";
import { Message } from "../models/message.model.js";
import { Room } from "../models/room.model.js";
import { generateChatId } from "../utils/helperFuntions.js";

const serviceName = "CHAT_SERVICE";
class ChatService {
  async getRoom(senderId, receiverId) {
    const functionName = "GET_ROOM";
    try {
      const generatedRoomId = await generateChatId(senderId, receiverId);
      const existedRoom = await Room.findOne({
        roomId: generatedRoomId,
      });

      return existedRoom;
    } catch (error) {
      console.log(`${serviceName}|${functionName}Error :: ${error}`);
    }
  }

  async createRoom(senderId, receiverId) {
    const functionName = "CREATE_ROOM";
    try {
      const generatedRoomId = await generateChatId(senderId, receiverId);

      const newRoom = await Room.create({
        roomId: generatedRoomId,
        senderId,
        receiverId,
      });

      return newRoom;
    } catch (error) {
      console.log(`${serviceName}|${functionName}Error :: ${error}`);
    }
  }

  async getRoomDetails(roomId) {
    const functionName = "GET_ROOM_DETAILS";
    try {
      const existingRoomDetails = await Room.findOne({
        roomId,
      });

      return existingRoomDetails;
    } catch (error) {
      console.log(`${serviceName}|${functionName}Error :: ${error}`);
    }
  }

  async insertMessage(roomId, senderId, content) {
    const functionName = "INSERT_MESSAGE";
    const validSenderId = mongoose.Types.ObjectId.isValid(senderId)
      ? new mongoose.Types.ObjectId(senderId)
      : null;
    try {
      const createdMessage = await Message.create({
        roomId,
        senderId: validSenderId,
        content,
      });

      if (createdMessage) {
        await Room.findByIdAndUpdate(
          roomId,
          { $push: { messages: createdMessage._id } },
          { new: true }
        );
      }
      return createdMessage;
    } catch (error) {
      console.error(`${functionName}: Error inserting message - `, error);
      throw error;
    }
  }
}

export default new ChatService();

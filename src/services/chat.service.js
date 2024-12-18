import mongoose from "mongoose";
import { Message } from "../models/message.model.js";
import { Room } from "../models/room.model.js";
import { User } from "..//models/user.model.js";
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
      })
        .populate({
          path: "messages",
          model: "Message",
          options: { sort: { createdAt: 1 } },
          select: "_id senderId content messageType createdAt updatedAt",

          populate: {
            path: "senderId",
            model: "User",
            select: "_id username", // assuming "name" is the field in User for senderName
          },
        })
        .populate({
          path: "senderId",
          model: "User",
          select: "_id username",
        })
        .populate({
          path: "receiverId",
          model: "User",
          select: "_id username",
        });

      if (!existingRoomDetails) return null;

      return {
        _id: existingRoomDetails._id,
        roomId: existingRoomDetails.roomId,
        senderDetails: {
          senderId: existingRoomDetails.senderId._id,
          senderName: existingRoomDetails.senderId.username,
        },
        receiverDetails: {
          receiverId: existingRoomDetails.receiverId._id,
          receiverName: existingRoomDetails.receiverId.username,
        },
        messages: existingRoomDetails.messages.map((msg) => ({
          Id: msg._id,
          senderId: msg.senderId._id,
          senderName: msg.senderId.username,
          content: msg.content,
          messageType: msg.messageType,
          createdAt: msg.createdAt,
          updatedAt: msg.updatedAt,
        })),
      };
    } catch (error) {
      console.log(`${serviceName}|${functionName}Error :: ${error}`);
    }
  }

  async insertMessage(roomId, senderId, content, messageType) {
    const functionName = "INSERT_MESSAGE";
    const validSenderId = mongoose.Types.ObjectId.isValid(senderId)
      ? new mongoose.Types.ObjectId(senderId)
      : null;
    try {
      const senderDetails = await User.findById(validSenderId).select(
        "username"
      );

      console.log(
        `User name of the user while inserting message is ${senderDetails.username}`
      );

      const senderName = senderDetails.username;

      const createdMessage = await Message.create({
        roomId,
        senderId: validSenderId,
        content,
        messageType,
      });

      if (createdMessage) {
        await Room.findOneAndUpdate(
          { roomId },
          { $push: { messages: createdMessage._id } },
          { new: true }
        );
      }

      //For converting mongoose object to plain object without converting object destructring wont work
      const createdMessageObject = createdMessage.toObject();
      return { ...createdMessageObject, senderName };
    } catch (error) {
      console.error(`${functionName}: Error inserting message - `, error);
      throw error;
    }
  }
}

export default new ChatService();

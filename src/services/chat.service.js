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
}

export default new ChatService();

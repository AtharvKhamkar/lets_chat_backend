import chatService from "../../services/chat.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const controllerName = "CHAT_CONTROLLER";

class Controller {
  async createRoom(req, res, next) {
    const functionName = `${controllerName} | CREATE_ROOM - `;
    let senderId = req.headers["x-user-id"];
    let { receiverId } = req.body;

    try {
        
        //check first room is already exists or not 
      let getRoomDetails = await chatService.getRoom(senderId, receiverId);

      let roomDetails = getRoomDetails;

      //If room is not exists then only create room
      if (!getRoomDetails) {
        roomDetails = await chatService.createRoom(senderId, receiverId);
      }

      if (roomDetails) {
        console.log(`${functionName}Room created successfully`);
        return res
          .status(201)
          .json(new ApiResponse(201, roomDetails, "Room created successfully"));
      } else {
        console.log(`${functionName}Error while creating room`);
        return res
          .status(500)
          .json(new ApiResponse(500, null, "Unable to create room"));
      }
    } catch (error) {
      console.log(`${functionName}ERROR :: ${error}`);
    }
  }
}

export default new Controller();

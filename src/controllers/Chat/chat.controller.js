import chatService from "../../services/chat.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

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

  async uploadImageMessage(req, res, next) {
    const functionName = `${controllerName} | uploadImageMessage`;

    try {
      const imageLocalFilePath = req.files.imageFile[0]?.path;

      if (!imageLocalFilePath) {
        return res
          .status(401)
          .json(new ApiResponse(401, null, "Image path is required"));
      }

      const imageUploadedFile = await uploadOnCloudinary(imageLocalFilePath);

      if (!imageLocalFilePath) {
        return res
          .status(401)
          .json(new ApiResponse(401, null, "Error while uploading image"));
      }

      return res.status(200).json(
        new ApiResponse(
          200,
          {
            name: imageUploadedFile.original_filename,
            size: imageUploadedFile.bytes,
            uri: imageUploadedFile.url,
          },
          "Image uploaded successfully"
        )
      );
    } catch (error) {
      console.log(`${functionName}ERROR :: ${error}`);
    }
  }
}

export default new Controller();

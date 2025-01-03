import userService from "../../services/auth.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const controllerName = "USER_CONTROLLER";

class Controller {
  async getUserList(req, res, next) {
    const functionName = `${controllerName} | GET_USER_LIST`;
    try {
      let usersList = await userService.usersList();

      if (usersList && usersList.length > 0) {
        return res
          .status(200)
          .json(new ApiResponse(200, usersList, "Successfully get all users"));
      }

      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "Failed to get list of user or no users found"
          )
        );
    } catch (error) {
      console.log(`${functionName}ERROR :: ${error} `);
    }
  }

  async getUserDetails(req, res, next) {
    const functionName = `${controllerName} || GET_USER_DETAILS`;
    try {
      let userId = req.headers["x-user-id"];

      console.log(`ID get from header is  ${userId}`);

      let checkUserExists = await userService.checkUserExistsById(userId);
      console.log(`Result of the  checkUserExists ${checkUserExists}`);
      if (checkUserExists) {
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              checkUserExists,
              "User details fetched successfully"
            )
          );
      }

      return res
        .status(400)
        .json(new ApiResponse(400, null, "Failed to get details of the user"));
    } catch (error) {
      console.log(`${functionName}ERROR :: ${error}`);
    }
  }
}

export default new Controller();

import userService from "../../services/user.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const controllerName = 'USER_CONTROLLER';

class Controller{

    async registerUser(req, res, next) {
        const functionName = `${controllerName}| REGISTER_USER - `;
        const { username, email,password } = req.body;

        try {

            if (
                [username,email,password].some((field) =>
                    field?.trim() == "")
            ) {
                return res.status(500).json(
                    new ApiResponse(
                        500,
                        null,
                        'username and email is required.'
                    )
                )
            }

            let isUserExists = await userService.checkUserExists(username, email);

            if (isUserExists) {
                return res.status(500).json(
                    new ApiResponse(
                        500,
                        null,
                        'User is already exists'
                    )
                )
            }

            const user = await userService.createUser(username, email,password);

            return res.status(201).json(
                new ApiResponse(
                    200,
                    user,
                    'User registered successfully'
                )
            )
        } catch (error) {
            console.log(`${functionName}ERROR :: ${error}`);
        }
    }
}

export default new Controller();
import userService from "../../services/user.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const controllerName = 'USER_CONTROLLER';

class Controller{

    async registerUser(req, res, next) {
        const functionName = `${controllerName}| REGISTER_USER - `;
        const { username, email,password } = req.body;
        console.log(email);
        

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

            let isUserExists = await userService.checkUserExists(email);

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

    //function for user login
    async loginUser(req, res, next) {
        const functionName = `${controllerName}| LOGIN_USER - `;
        const email = req.body.email;
        const password = req.body.password;

        console.log(email);
        console.log(password);
        
        

        try {

            if (
                [email,password].some((field) =>
                    field?.trim() == "")
            ) {
                return res.status(500).json(
                    new ApiResponse(
                        500,
                        null,
                        'email and password is required for login.'
                    )
                )
            }

            let isUserExists = await userService.checkUserExists(email);
            

            if (!isUserExists) {
                return res.status(500).json(
                    new ApiResponse(
                        500,
                        null,
                        'You have not registered yet!'
                    )
                )
            }

            const loggedInUser = await userService.loginUser(email,password);
            
            
            if(loggedInUser){
                return res.status(200).json(
                    new ApiResponse(
                        200,
                        loggedInUser,
                        'User logged in successfully'
                    )
                )
            }else{
                return res.status(500).json(
                    new ApiResponse(
                        500,
                        loggedInUser,
                        'Invalid Credentials'
                    )
                )
            }
        } catch (error) {
            console.log(`${functionName}ERROR :: ${error}`);
        }
    }
}

export default new Controller();
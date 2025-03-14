import { User } from "../models/user.model.js";

const serviceName = "AUTH_SERVICE";

class UserService {
  async checkUserExists(email) {
    const functionName = "CHECK_USER_EXISTS";
    try {
      const existedUser = await User.findOne({
        email,
      });

      return existedUser;
    } catch (error) {
      console.log(`${serviceName}|${functionName}Error :: ${error}`);
    }
  }

  async checkUserExistsById(userId) {
    const functionName = "CHECK_USER_EXISTS_BY_ID";
    try {
      const existedUser = await User.findById({
        _id: userId,
      }).select("-password");

      return existedUser;
    } catch (error) {
      console.log(`${serviceName}|${functionName}Error :: ${error}`);
    }
  }

  async createUser(username, email, password) {
    const functionName = "CREATE_USER";
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
      return user;
    } catch (error) {
      console.log(`${serviceName}|${functionName}Error :: ${error}`);
    }
  }

  async loginUser(email, password) {
    const functionName = "LOGIN_USER";
    try {
      const isCorrectCred = await User.findOne({
        email,
        password,
      }).select("-password");

      return isCorrectCred;
    } catch (error) {
      console.log(`${serviceName}|${functionName}Error :: ${error}`);
    }
  }

  async usersList() {
    const functionName = "USERS_LIST";
    try {
      const allUsers = await User.find({}).select("id username");
      console.log(allUsers);
      return allUsers;
    } catch (error) {
      console.log(`${serviceName}|${functionName}Error :: ${error}`);
    }
  }
}

export default new UserService();

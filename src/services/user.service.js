import {User} from '../models/user.model.js'

const serviceName = 'USER_SERVICE';

class UserService{
    async usersList(){
        const functionName = 'USERS_LIST';
        try {
            const allUsers = await User.find({}).select('-password');
            return allUsers;
        } catch (error) {
            console.log(`${serviceName}|${functionName}Error :: ${error}`);
        }
    }
}

export default new UserService();
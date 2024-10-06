import {User} from '../models/user.model.js'

const serviceName = 'USER_SERVICE';

class UserService{
    async checkUserExists(username,email) {
        const functionName = 'CHECK_USER_EXISTS';
        try {
            const existedUser = await User.findOne({
                $or:[{username},{email}]
            })

            return existedUser;
        } catch (error) {
            console.log(`${serviceName}|${functionName}Error :: ${error}`);
        }
    };

    async createUser(username,email) {
        const functionName = 'CREATE_USER';
        try {
            const user = await User.create({
                username,
                email
            })
            return user;
        } catch (error) {
            console.log(`${serviceName}|${functionName}Error :: ${error}`);
        }
    }

}

export default new UserService();
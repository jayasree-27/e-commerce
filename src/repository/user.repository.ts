import db from "../config/db";
import { type UserAttributes } from "../models/user.model";

const createUser = async (userData: UserAttributes) => {
    return await db.User.create(userData);
}




export default {
    createUser
};
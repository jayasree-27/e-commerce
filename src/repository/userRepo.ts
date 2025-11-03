import db from "../config/db";
import { type UserAttributes } from "../models/user.model";

const createUser = async (userData: UserAttributes) => {
    return await db.User.create(userData);
};

const findUserByEmail = async (email: string) => {
    return await db.User.findOne({ where: { email } });
};


// const loginUser = async (email: string, password: string) => {
//     const user = await db.User.findOne({ where: { email } });
//     if (!user) {
//         throw new Error("Invalid email or password");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         throw new Error("Invalid email or password");
//     }

//     const token = jwt.sign(
//         { id: user.id, role: user.role },
//         JWT_SECRET,
//         { expiresIn: "7d" }
//     );

//     return {
//         message: "Login successful",
//         token,
//         user: {
//             id: user.id,
//             email: user.email,
//             role: user.role,
//         },
//     };
// };

export {
    createUser,
    findUserByEmail
}
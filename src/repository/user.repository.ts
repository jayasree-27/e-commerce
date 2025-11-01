import db from "../config/db";
import { type UserAttributes } from "../models/user.model";

const registerUser = async (userData: UserAttributes) => {
    return await db.User.create(userData);
}



import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

export const registerUserService = async (data: any) => {
    const { email, password, firstName, lastName } = data;

    // Check if email exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db.User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: "user"
    });

    const token = jwt.sign(
        { id: newUser.id, role: newUser.role },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        message: "User registered successfully",
        token,
        user: {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role
        }
    };
};




export default {
    registerUser,
};
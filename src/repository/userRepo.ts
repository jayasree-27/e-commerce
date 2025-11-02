import db from "../config/db";
import { type UserAttributes } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

const registerUser = async (userData: UserAttributes) => {
    const { email, password, firstName, lastName } = userData;

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: "user",
    });

    return {
        message: "User registered successfully",
    };
};


const loginUser = async (email: string, password: string) => {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        message: "Login successful",
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    };
};

export {
    registerUser,
    loginUser
}
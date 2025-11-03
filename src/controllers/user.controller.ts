import { Request, Response } from "express";
import {findUserByEmail,createUser} from "../repository/userRepo";
import { generateToken } from "../utils/token.utils";4
import bcrypt from "bcryptjs";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: "user",
        } as any);

        const token = generateToken({ id: newUser.id, role: newUser.role });

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
        });

    } catch (error: any) {
        return res.status(500).json({
            message: error.message || "Registration failed"
        });
    }
};


export const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "no user registered with this email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken({ id: user.id, role: user.role });

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Login failed" });
    }
};






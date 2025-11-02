import { Request, Response } from "express";
import {loginUser,registerUser} from "../repository/userRepo";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({
            message: err.message || "Registration failed"
        });
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const response = await loginUser(email, password);
        res.status(200).json(response);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};





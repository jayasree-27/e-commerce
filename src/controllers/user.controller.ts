import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../repository/user.repository";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const result = await registerUserService(req.body);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({
            message: err.message || "Registration failed"
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const response = await loginUserService(email, password);
        res.status(200).json(response);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};


export default{
    registerUserController,
    loginUser,
}



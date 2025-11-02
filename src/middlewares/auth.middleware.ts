import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface authRequest extends Request {
    user?: any;
}

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";


export const authMiddleware = (req: authRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};


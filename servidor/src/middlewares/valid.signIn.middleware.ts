import { NextFunction, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
import { RequestWithUser } from "../types/IRequest";

export const validateSingIn = (req: RequestWithUser, res:Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) throw new Error("Authorization header is missing or malformed");

    const token = authHeader.split(" ")[1];

    if (!token) throw new Error("Token not found");

    try {   
        const decoded = verify(token, TOKEN_SECRET!) as JwtPayload;
        req.user = {
            _id: decoded.userId,
        };
        next()
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        return res.status(500).json({ error: errorMessage });
    }
}
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateDataUser = (schema:any) => (req: Request, res:Response, next: NextFunction) => {
    try {   
        schema.parse(req.body)
        next()
    } catch (error) {
        if (error instanceof z.ZodError) { 
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ errors: errorMessages });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
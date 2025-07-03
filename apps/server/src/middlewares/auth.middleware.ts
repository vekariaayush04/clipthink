import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { prisma } from "../lib/auth";
import { auth } from "../lib/auth";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<any> => {
    try {
        const session = await auth.api.getSession({
            headers : req.headers as any
        });
        
        if (!session){
            return res.status(401).json({
                message: "Unauthorised",
            });
        }
        
        
        if (!session.user) {
            return res.status(401).json({
                message: "Unauthorised",
            });
        }

        req.user = session.user

        next();
    } catch (error) {
        console.error("Unauthorised", error);
        return res.status(500).json({
            message: "Unauthorised",
            error,
        });
    }
};

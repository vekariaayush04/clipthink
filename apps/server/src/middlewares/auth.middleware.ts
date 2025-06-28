import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@repo/db/store";
import { NextFunction, Response, Request } from "express";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<any> => {
    try {
        const token = req.cookies.jwt;
        console.log("Token from cookies:", token);
        
        if (!token) {
            return res.status(401).json({
                message: "Unauthorised",
            });
        }

        console.log("Token found:", token);
        
        let decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        console.log(user);
        
        if (!user) {
            return res.status(401).json({
                message: "Unauthorised",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("Unauthorised", error);
        return res.status(500).json({
            message: "Unauthorised",
            error,
        });
    }
};

import bcrypt from "bcryptjs";
import prisma from "@repo/db/store";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";

export const register = async (req: Request, res: Response): Promise<any> => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            message: "Missing User Credentials",
        });
    }

    try {
        const isUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (isUser) {
            return res.status(400).json({
                message: "User Already Exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const new_user = await prisma.user.create({
            data: {
                email,
                password : hashedPassword,
                name
            },
        });

        const token = jwt.sign(
            {
                id: new_user.id,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
            },
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24,
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user: {
                id: new_user.id,
                name: new_user.name,
                email: new_user.email
            },
        });
    } catch (error) {
        console.error("Error creating user", error);
        return res.status(500).json({
            message: "Error creating user",
            error,
        });
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Missing User Credentials",
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Email or Password",
            });
        }

        const isMatch = await bcrypt.compare(password, user!.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Email or Password",
            });
        }

        const token = jwt.sign(
            {
                id: user!.id,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
            },
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24,
        });

        return res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            user: {
                id: user!.id,
                name: user!.name,
                email: user!.email
            },
        });
    } catch (error) {
        console.error("Error logging user", error);
        return res.status(500).json({
            message: "Error logging user",
            error,
        });
    }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV !== "development",
        });

        return res.status(200).json({
            success: true,
            message: "User Logged Out Successfully",
        });
    } catch (error) {
        console.error("Error logging out user", error);
        return res.status(500).json({
            message: "Error logging out user",
            error,
        });
    }
};

export const me = async (req: Request, res: Response): Promise<any> => {
    try {
        return res.status(200).json({
            success: true,
            message: "User Authenticated Successfully",
            user: req.user,
        });
    } catch (error) {
        console.error("Error Authenticating user", error);
        return res.status(500).json({
            message: "Error Authenticating user",
            error,
        });
    }
};
import { Request } from "express";
import { User } from "../../prisma/generated/prisma";

declare global {
    namespace Express {
        interface Request {
            user?: Pick<User>;
        }
    }
}
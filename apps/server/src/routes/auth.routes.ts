import { Router } from "express";
import { login, logout, me, register } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter : Router = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", authMiddleware, logout);

authRouter.get("/me", authMiddleware, me);


export default authRouter;
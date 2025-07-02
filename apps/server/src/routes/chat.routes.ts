import { Router } from "express";
import { generateVideo, getStatus } from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const chatRouter : Router = Router()

chatRouter.post("/generate-video", authMiddleware, generateVideo)
chatRouter.get("/get-status/:promptId" , authMiddleware, getStatus)

export default chatRouter
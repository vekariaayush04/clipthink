import { Router } from "express";
import { generateVideo, getStatus } from "../controllers/chat.controller";

const chatRouter : Router = Router()

chatRouter.post("/generate-video", generateVideo)
chatRouter.get("/get-status/:promptId" , getStatus)

export default chatRouter
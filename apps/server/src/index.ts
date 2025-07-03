import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chat.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

dotenv.config();

const app = express();

// app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL as string, "http://192.168.1.5:5000"],
    credentials: true,
  })
);

// app.all('/api/v1/auth/{*any}', toNodeHandler(auth));
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.use("/api/v1/chat", chatRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

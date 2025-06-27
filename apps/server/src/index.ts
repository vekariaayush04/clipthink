import express from "express";
import prisma from "@repo/db/store";

const app = express();

app.use(express.json())

app.post("/create-user", async (req, res) => {
    const user = await prisma.user.create({
        data: {
            email: "test@test.com",
            name: "Test User",
            password: "password"
        }
    })
    res.json(user)
})

app.get("/get-user", async (req, res) => {
    const user = await prisma.user.findMany()
    res.json(user)
})

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})






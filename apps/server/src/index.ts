import express from "express";
import prisma from "@repo/db/store";
import queue from "./lib/Queue";
import createWorker from "./lib/Worker";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/create-user", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      name: "Test User",
      password: "password",
    },
  });
  res.json(user);
});

app.get("/get-user", async (req, res) => {
  const user = await prisma.user.findMany();
  res.json(user);
});

app.post("/generate-code", async (req, res) => {
  const { prompt } = req.body;

  //make db entry for the prompt
  const promptEntry = await prisma.prompt.create({
    data: {
      status: "PENDING",
      content: prompt as string,
      userId: "1aa62ca1-5679-4a4c-ad16-edc2532f4468",
    },
  });
  //add to queue
  await queue.add("video-generation", {
    promptId: promptEntry.id,
    content: prompt as string,
  });

  const worker = await createWorker();
  worker.run();

  res.json({
    message: "Video generation started",
    promptId: promptEntry.id,
  });
});

app.get("/get-url/:promptId", async (req, res) => {
  const promptId = req.params.promptId;
  const prompt = await prisma.prompt.findUnique({
    where: { id: promptId as string },
  });
  const isCompleted = prompt?.status === "COMPLETED";
  if (isCompleted) {
    res.json({
      message: "Video is Generated",
      status: prompt?.status,
      url: prompt?.videoUrl,
    });
  } else {
    res.json({
      message: "Video is not Generated",
      status: prompt?.status,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

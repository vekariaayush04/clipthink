import { Worker } from "bullmq";
import IORedis from "ioredis";
import generateCode from "./Ai";
import fs from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";
import prisma from "@repo/db/store";
import uploadVideo from "./uploadVideo";

const execAsync = promisify(exec);

const connection = new IORedis({ maxRetriesPerRequest: null });

const createWorker = async () => {
  const worker = new Worker(
    "video-generation",
    async (job) => {
      const { promptId, content } = job.data;
      const output = await generateCode(content);
      const { code, command } = JSON.parse(output || "{}");
      console.log("worker started", job.id);

      //create a folder with the promptId
      const folderPath = `../videos/${promptId}`;
      await fs.mkdir(folderPath, { recursive: true });
      //write the code to a file
      await fs.writeFile(`${folderPath}/code.py`, code);

      //run the command
      const { stdout, stderr } = await execAsync(command, { cwd: folderPath });

      console.log("✅ Manim STDOUT:", stdout);
      console.error("⚠️ Manim STDERR:", stderr);

      const videoUrl = await uploadVideo(
        `${folderPath}/media/videos/code/2160p60/output.mp4`,
        promptId
      );
      console.log("uploading video to cloudinary", videoUrl);
      //update the prompt status to completed
      await prisma.prompt.update({
        where: { id: promptId },
        data: { status: "COMPLETED", videoUrl },
      });

      //delete the folder
      await fs.rm(folderPath, { recursive: true });

      return promptId;
    },
    { connection, autorun: false }
  );

  worker.on("completed", (job, result) => {
    console.log(`Job ${job.id} completed with result ${result}`);
  });

  worker.on("failed", (job, err) => {
    console.log(`${job?.id} has failed with ${err.message}`);
  });
  return worker;
};

export default createWorker;

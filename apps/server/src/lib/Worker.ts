import { Worker } from "bullmq";
import IORedis from "ioredis";
import generateCode from "./Ai";
import fs from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";
import uploadVideo from "./uploadVideo";
import queue from "./Queue";
import runManim from "./runManim";
import { prisma } from "./auth";

const execAsync = promisify(exec);

const connection = new IORedis({ maxRetriesPerRequest: null });

const createWorker = async () => {
  const worker = new Worker(
    "video-generation",
    async (job) => {
      const { promptId, content , retries , userId } = job.data;
      const folderPath = `../videos/${promptId}}`;

      //if the retries is greater than 2, update the prompt status to failed
      if (retries > 2) {
        await fs.rm(folderPath, { recursive: true });

        await prisma.prompt.update({
          where: { id: promptId },
          data: { status: "FAILED" },
        });
        return promptId;
      }

      //generate the code
      const output = await generateCode(content);
      const { code, command , dependencies } = JSON.parse(output || "{}");
      console.log("worker started", job.id);
      // console.log(dependencies);
      
      //create a folder with the promptId
      // const folderPath = `../videos/${promptId}}`;
      await fs.mkdir(folderPath, { recursive: true });
      //write the code to a file
      await fs.writeFile(`${folderPath}/manim_scene.py`, code);

      //run the command
      // const { stdout, stderr } = await execAsync(command, { cwd: folderPath });

      // console.log("✅ Manim STDOUT:", stdout);
      // console.error("⚠️ Manim STDERR:", stderr);

      await runManim(["-m", "manim", "manim_scene.py", "SceneName", "-qk", "-o", "output.mp4"], folderPath);


      const videoUrl = await uploadVideo(
        `${folderPath}/media/videos/manim_scene/2160p60/output.mp4`,
        promptId
      );
      console.log("uploading video to cloudinary", videoUrl);
      //update the prompt status to completed
      await prisma.prompt.update({
        where: { id: promptId },
        data: { status: "COMPLETED", videoUrl },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { credits: { decrement: 1 } },
      })

      //delete the folder
      await fs.rm(folderPath, { recursive: true });

      return promptId;
    },
    { connection, autorun: false , maxStalledCount : 0 }
  );

  worker.on("completed", (job, result) => {
    console.log(`Job ${job.id} completed with result ${result}`);
  });

  worker.on("failed", async (job, err) => {
    // create entry and retry
    const promptEntry = await prisma.prompt.update({
      where: { id: job?.data.promptId as string },
      data: { retries: { increment: 1 } },
    });
    console.log("retrying for " , promptEntry.retries , "time")

    await queue.add("video-generation", {
      promptId: promptEntry.id,
      content: JSON.stringify({
        content  : promptEntry.content,
        error : err.message
      }),
      retries: promptEntry.retries,
    });

    console.log(`${job?.id} has failed with ${err.message}`);
  });
  return worker;
};

export default createWorker;

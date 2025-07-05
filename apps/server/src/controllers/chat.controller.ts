import prisma from "@repo/db/store";
import { Request, Response } from "express";
import queue from "../lib/Queue";
import createWorker from "../lib/Worker";


export const generateVideo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {

    //is credit available
    const credits = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { credits: true },
    });
    

    if (credits?.credits === 0) {
      return res.json({
        success: false,
        message: "You do not have enough credits",
      });
    }

    const { prompt } = req.body;

    //make db entry for the prompt
    const promptEntry = await prisma.prompt.create({
      data: {
        status: "PENDING",
        content: prompt as string,
        userId: req.user.id,
      },
    });

    //add to queue
    await queue.add("video-generation", {
      promptId: promptEntry.id,
      content: prompt as string,
      retries: 0,
      userId: req.user.id
    });

    const worker = await createWorker();
    worker.run();

    return res.json({
      success: true,
      message: "Video Generation Started",
      promptId: promptEntry.id,
    });
  } catch (error) {
    
    return res.json({
      success: false,
      message: "Video Generation Failed",
      error : {error},
    });
  }
};

export const getStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const promptId = req.params.promptId;
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId as string },
    });
    const isCompleted = prompt?.status === "COMPLETED";
    if (isCompleted) {
      return res.json({
        message: "Video is Generated",
        status: prompt?.status,
        url: prompt?.videoUrl,
      });
    } else {
      return res.json({
        message: "Video is not Generated",
        status: prompt?.status,
      });
    }
  } catch (error) {
    return res.json({
      message: "Error Fetching Status",
      error,
    });
  }
};

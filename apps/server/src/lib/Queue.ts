import { Queue } from "bullmq";

const queue = new Queue("video-generation")

export default queue;
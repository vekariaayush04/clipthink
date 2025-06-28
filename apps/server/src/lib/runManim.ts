import { spawn } from "child_process";

const runManim = (cmd: string[], cwd: string) =>
  new Promise<void>((resolve, reject) => {
    const child = spawn("python", cmd, { cwd });

    child.stdout.on("data", (data) => {
      console.log("📤 stdout:", data.toString());
    });

    child.stderr.on("data", (data) => {
      console.error("⚠️ stderr:", data.toString());
    });

    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Manim exited with code ${code}`));
    });
  });

export default runManim
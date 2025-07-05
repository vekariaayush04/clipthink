import axios from "axios";
import { create } from "zustand";

interface VideoGenerationState {
  isGenerating: boolean;
  progress: number;
  videoUrl: string | null;
  error: string | null;
  promptId: string | null;
  status: "PENDING" | "COMPLETED" | "PROCESSING" | "FAILED";
  generateVideo: (prompt: string) => Promise<string>;
  getStatus: (promptId: string) => Promise<string>;
}

export const useVideoGenerationStore = create<VideoGenerationState>((set) => ({
  isGenerating: false,
  progress: 0,
  videoUrl: null,
  error: null,
  promptId: null,
  status: "PENDING",
  generateVideo: async (prompt: string) => {
    set({ isGenerating: true });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/chat/generate-video`,
        {
          prompt,
        },
        {
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error("Not Enough Credits");
      }

      const { promptId } = response.data;

      set({ promptId });

      return promptId;
    } catch (error) {
      set({
        isGenerating: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  },
  getStatus: async (promptId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/chat/get-status/${promptId}`,
        {
          withCredentials: true,
        }
      );
      set({ progress: 10 });
      if (response.data.status === "COMPLETED") {
        set({ videoUrl: response.data.url });
      }
      if (
        response.data.status !== "PENDING" &&
        response.data.status !== "PROCESSING"
      ) {
        set({ isGenerating: false });
      }
      set({ status: response.data.status });
      return response.data.status;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  },
}));

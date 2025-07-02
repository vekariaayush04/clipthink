"use client";
import type React from "react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoadingState } from "@/components/loading-state";
import { VideoPlayer } from "@/components/video-player";
import { useVideoGeneration } from "@/hooks/use-video-generation";
import { ArrowRight, ArrowUp, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { toastStyle } from "@/lib/utils";


export function VideoGenerator({ user }: { user: any }) {
  const [prompt, setPrompt] = useState("");
  const { isGenerating, progress, videoUrl, error, generateVideo, reset } =
    useVideoGeneration();

  const handleSubmit = useCallback(
    //check if user has enough credits
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (user.credits <= 0) {
        toast.error("You don't have enough credits" ,{
          style : toastStyle as any
        });
        return;
      }
      if (!prompt.trim() || isGenerating) return;
      await generateVideo(prompt.trim());
    },
    [prompt, isGenerating, generateVideo]
  );

  const handleNewVideo = useCallback(() => {
    reset();
    setPrompt("");
  }, [reset]);

  if (videoUrl) {
    return (
      <div className="space-y-8">
        <VideoPlayer videoUrl={videoUrl} prompt={prompt} />
        <div className="text-center">
          <Button
            onClick={handleNewVideo}
            className="bg-white text-black hover:bg-gray-100 font-medium px-8 py-3 rounded-full transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Create Another Video
          </Button>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return <LoadingState progress={progress} prompt={prompt} />;
  }

  return (
    <div className="text-center space-y-12">
      {/* Hero Section */}
      <div className="space-y-6">
        <h1 className="text-5xl md:text-5xl font-bold text-white leading-tight">
          What can I help you build?
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Transform your ideas into stunning 2D math animation videos with AI.
          Describe your scenario and watch it come to life.
        </p>
      </div>

      {/* Input Card */}
      <div className="max-w-3xl mx-auto">
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="border-[#2a2b32] border-2 focus:outline-1 focus:outline-white rounded-xl p-4 min-h-[140px] dark:bg-secondary focus:border-white  ">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A Sphere to Cube animation with a rotating cube..."
                  className="border-none shadow-none bg-auto text-white dark:bg-transparent placeholder:text-gray-300 !text-lg leading-relaxed resize-none font-normal rounded-xl p-2 focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0"
                  disabled={isGenerating}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    className=""
                    disabled={!prompt.trim() || isGenerating}
                  >
                    <ArrowUp className="w-5 h-5 text-2xl group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300 ml-1">
                  Be specific and descriptive for best results
                </span>
                <span className="text-gray-300 mr-1">{prompt.length}/500</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 ">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Features */}
      {/* <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white font-semibold">AI-Powered</h3>
          <p className="text-gray-400 text-sm">Advanced AI models create stunning visuals from your descriptions</p>
        </div>

        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-white font-semibold">Lightning Fast</h3>
          <p className="text-gray-400 text-sm">Generate high-quality videos in seconds, not hours</p>
        </div>

        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-white font-semibold">Easy to Use</h3>
          <p className="text-gray-400 text-sm">No technical skills required - just describe and create</p>
        </div>
      </div> */}
    </div>
  );
}

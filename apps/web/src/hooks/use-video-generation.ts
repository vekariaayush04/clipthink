"use client"

import { useState, useCallback } from "react"

interface VideoGenerationState {
  isGenerating: boolean
  progress: number
  videoUrl: string | null
  error: string | null
}

export function useVideoGeneration() {
  const [state, setState] = useState<VideoGenerationState>({
    isGenerating: false,
    progress: 0,
    videoUrl: null,
    error: null,
  })

  const generateVideo = useCallback(async (prompt: string) => {
    setState({
      isGenerating: true,
      progress: 0,
      videoUrl: null,
      error: null,
    })

    try {
      // Step 1: Submit prompt to server
      const response = await fetch("http://localhost:3000/api/v1/chat/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit video generation request")
      }

      const { promptId , success} = await response.json()

      if (!success) {
        throw new Error("Not Enough Credits")
      }

      // Step 2: Poll for completion
      await pollForCompletion(promptId)
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isGenerating: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }))
    }
  }, [])

  const pollForCompletion = useCallback(async (promptId: string) => {
    const pollInterval = 2000
    let progress = 10

    const poll = async (): Promise<void> => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/chat/get-status/${promptId}`, {
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Failed to check video status")
        }

        const data = await response.json()

        progress = Math.min(progress + Math.random() * 15, 95)
        setState((prev) => ({ ...prev, progress }))

        if (data.status === "COMPLETED" && data.url) {
          setState((prev) => ({
            ...prev,
            isGenerating: false,
            progress: 100,
            videoUrl: data.url,
          }))
          return
        } else if (data.status === "FAILED") {
          throw new Error(data.error || "Video generation failed")
        }

        setTimeout(poll, pollInterval)
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isGenerating: false,
          error: error instanceof Error ? error.message : "Polling failed",
        }))
      }
    }

    setTimeout(poll, pollInterval)
  }, [])

  const reset = useCallback(() => {
    setState({
      isGenerating: false,
      progress: 0,
      videoUrl: null,
      error: null,
    })
  }, [])

  return {
    ...state,
    generateVideo,
    reset,
  }
}

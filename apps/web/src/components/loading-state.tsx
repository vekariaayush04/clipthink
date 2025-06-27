"use client"

import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  progress: number
  prompt: string
}

export function LoadingState({ progress, prompt }: LoadingStateProps) {
  const getStatusMessage = (progress: number) => {
    if (progress < 25) return "Analyzing your prompt..."
    if (progress < 50) return "Generating video frames..."
    if (progress < 75) return "Adding motion and effects..."
    if (progress < 95) return "Finalizing your video..."
    return "Almost ready!"
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 shadow-2xl">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-gray-500/20 rounded-2xl blur opacity-75"></div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Creating your video</h3>
            <p className="text-gray-400 max-w-md mx-auto leading-relaxed">"{prompt}"</p>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-2 bg-gray-800" />
            <div className="space-y-2">
              <p className="text-white font-medium">{getStatusMessage(progress)}</p>
              <p className="text-sm text-gray-500">This usually takes 30-60 seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

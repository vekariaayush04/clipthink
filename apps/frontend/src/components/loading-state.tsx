import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  progress: number
}

export function LoadingState({ progress }: LoadingStateProps) {
  const getStatusMessage = (progress: number) => {
    if (progress < 25) return "Analyzing your prompt..."
    if (progress < 50) return "Generating video frames..."
    if (progress < 75) return "Adding motion and effects..."
    if (progress < 95) return "Finalizing your video..."
    return "Almost ready!"
  }

  return (
    <div className="flex-1 flex justify-center items-center bg-background ">
    <div className="w-2xl mx-auto px-4">
      <div className="bg-[#151515] border-2 border-[#2a2b32] rounded-2xl p-10 shadow-xl">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-[#1f1f1f] rounded-2xl flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-gray-500/10 rounded-2xl blur opacity-70"></div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Creating your video</h3>
            {/* <p className="text-gray-300 max-w-md mx-auto leading-relaxed">"{prompt}"</p> */}
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-2 bg-[#1f1f1f]" />
            <div className="space-y-2">
              <p className="text-white font-medium">{getStatusMessage(progress)}</p>
              <p className="text-sm text-gray-500">This usually takes 30–60 seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Download, Share2, Play } from "lucide-react"

interface VideoPlayerProps {
  videoUrl: string
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = videoUrl
    link.download = "generated-video.mp4"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AI Generated Video",
          text: `Check out this AI-generated video: "${prompt}"`,
          url: videoUrl,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(videoUrl)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4">
      {/* Video Container */}
      <div className="bg-[#151515] border-2 border-[#2a2b32] rounded-2xl overflow-hidden shadow-xl">
        <div className="aspect-video bg-black relative group">
          <video
            src={videoUrl}
            controls
            className="w-full h-full object-contain"
            autoPlay
            muted
            loop
          >
            Your browser does not support the video tag.
          </video>

          {/* Play overlay for better UX */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-black/50 rounded-full p-4">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">Your Generated Video</h3>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleDownload}
              className="flex-1 bg-[#1f1f1f] hover:bg-[#2a2b32] text-white border border-[#2a2b32] rounded-xl py-3"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={handleShare}
              className="flex-1 bg-[#1f1f1f] hover:bg-[#2a2b32] text-white border border-[#2a2b32] rounded-xl py-3"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

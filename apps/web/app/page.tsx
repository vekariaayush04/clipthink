"use client"
import { VideoGenerator } from "@/components/video-generator"

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(240_3%_6%)] flex items-center justify-center">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <VideoGenerator />
        </div>
      </div>
    </div>
  )
}

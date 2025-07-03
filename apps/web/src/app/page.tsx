import { VideoGenerator } from "@/components/video-generator";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";

export default async function Home() {
  return (
    <div className="flex h-screen flex-col max-w-screen box-border">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <VideoGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}

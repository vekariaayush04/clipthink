"use client";
import { VideoGenerator } from "@/components/video-generator";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { Loader } from "lucide-react";

export default function Home() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session && !isPending) {
      router.push("/");
    }
    if(!session){
      router.push("/auth");
    }
  }, [session, isPending]);

  if(!session || isPending) {
    return <div>
      <div className="flex h-screen flex-col max-w-screen box-border">
      <Navbar />
      <div className="flex-1 bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
            <Loader className="w-12 h-12 text-white animate-spin" />
          </div>
        </div>
      </div>
    </div></div>;
  }

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

import { useSession } from "@/lib/auth-client";
import { VideoForm } from "@/components/video-form";
import MainLoader from "@/components/Loader";

export default function HomePage() {
  const { isPending } = useSession();

  if (isPending) {
    return <MainLoader />;
  }

  return (
    <div className="flex h-screen flex-col max-w-screen box-border">
      <div className="flex-1 bg-background flex items-center justify-center">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-12">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold text-white">
                  What can I help you build?
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Transform your ideas into stunning 2D math animation videos
                  with AI.
                </p>
              </div>
              <VideoForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

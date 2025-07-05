import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoPlayer } from "@/components/video-player";
import { LoadingState } from "@/components/loading-state";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useVideoGenerationStore } from "@/store/videoGenerationStore";
import { useSession } from "@/lib/auth-client";
import MainLoader from "@/components/Loader";

export default function GeneratedVideoPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: session, isPending, refetch: refetchSession } = useSession();
  const { isGenerating, progress, videoUrl, error, getStatus } =
    useVideoGenerationStore();

  useEffect(() => {
    if (!isPending && !session) {
      navigate("/auth");
    }
    refetchSession();
  }, [session, isPending, isGenerating]);

  if (isPending) {
    return <MainLoader />;
  }

  const handleNewVideo = () => {
    navigate(`/`);
  };

  useEffect(() => {
    if (id) {
      poll(id);
    }
  }, [id]);

  async function poll(id: string) {
    const status = await getStatus(id);

    if (status === "FAILED" || !status) return;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (status === "PROCESSING" || status === "PENDING") {
      await poll(id);
    }
  }

  if (isGenerating) {
    return <LoadingState progress={progress} />;
  }

  if (videoUrl) {
    return (
      <div className="flex-1 flex justify-center items-center bg-background">
        <div className="space-y-8">
          <VideoPlayer videoUrl={videoUrl} />
          <div className="text-center">
            <Button
              onClick={handleNewVideo}
              className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Another Video
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return error ? (
    <div className="text-red-500 text-center mt-12">{error}</div>
  ) : null;
}

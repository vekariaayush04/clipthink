import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import { useVideoGenerationStore } from "@/store/videoGenerationStore";
import { AuthRequiredDialog } from "./auth-required-dialog";
import { useSession } from "@/lib/auth-client";

export function VideoForm() {
  const { data: session } = useSession();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const { generateVideo, isGenerating, error } = useVideoGenerationStore();

  // useEffect(() => {
  //   if (!isPending && !session) {
  //     navigate("/auth");
  //   }
  // }, [session, isPending]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!session) {
        setShowDialog(true);
        return;
      }

      if (!prompt.trim()) return;

      // generate unique ID for prompt (optional: use UUID or hash)
      const promptId = await generateVideo(prompt);

      // Ideally: send prompt to backend / context / state here

      if (promptId) {
        navigate(`/generate/${promptId}`);
      }
    },
    [prompt]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <AuthRequiredDialog open={showDialog} onOpenChange={setShowDialog} />
      <div className="space-y-4">
        <div className="border-[#2a2b32] border-2 rounded-xl p-4 min-h-[140px] dark:bg-secondary ">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A Sphere to Cube animation with a rotating cube..."
            className="border-none shadow-none bg-auto text-white dark:bg-transparent placeholder:text-gray-300 !text-lg leading-relaxed resize-none font-normal rounded-xl p-2 focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0"
            disabled={isGenerating}
          />
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={!prompt.trim()}>
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-300">
          <span>Be specific and descriptive for best results</span>
          <span>{prompt.length}/500</span>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>
    </form>
  );
}

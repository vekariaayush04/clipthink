import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface AuthRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthRequiredDialog({ open, onOpenChange }: AuthRequiredDialogProps) {
  const navigate = useNavigate();

  const handleAuthRedirect = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    onOpenChange(false);
    navigate("/auth");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 bg-transparent border-none max-w-md w-full">
        <div className="relative w-full max-w-md">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-white">Sign In</h1>
                <p className="text-white/70 text-base">
                  One step closer to Generating your favorite videos.
                </p>
              </div>

              <div className="flex gap-3 justify-center items-center w-full">
                <Button
                  className="w-1/2 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3"
                  size="lg"
                  onClick={() => handleAuthRedirect()}
                >
                  Sign in
                </Button>
                <Button
                  className="w-1/2 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3"
                  size="lg"
                  onClick={() => handleAuthRedirect()}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

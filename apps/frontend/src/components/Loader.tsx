import { Loader } from "lucide-react";

const MainLoader = () => {
  return (
    <div>
      <div className="flex h-screen flex-col max-w-screen box-border">
        <div className="flex-1 bg-background flex items-center justify-center">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
              <Loader className="w-12 h-12 text-white animate-spin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLoader;

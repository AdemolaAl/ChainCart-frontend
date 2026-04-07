import { LoaderPinwheel } from "lucide-react";

export default function Preload() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-950 z-50">
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-cyan-500/10 blur-[60px] animate-pulse" />
        </div>
        <div className="relative flex items-center justify-center">
          <LoaderPinwheel className="h-24 w-24 sm:h-28 sm:w-28 animate-spin text-cyan-400" />
        </div>
        <p className="mt-8 text-sm font-medium text-cyan-400/80 tracking-[0.3em] uppercase">
          Initializing...
        </p>
      </div>
    </div>
  );
}

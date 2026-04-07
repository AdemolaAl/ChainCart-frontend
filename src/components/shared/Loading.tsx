import { Loader2 } from "lucide-react";

export default function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
        <Loader2 className="animate-spin h-8 w-8 mb-3 text-cyan-400 relative z-10" />
      </div>
      <p className="text-gray-400 text-sm tracking-wide mt-2">{text}</p>
    </div>
  );
}

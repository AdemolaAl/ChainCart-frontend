import { Heart, Share2, RefreshCw } from "lucide-react";

export default function ProductActions() {
  return (
    <div className="flex space-x-6 text-gray-500 mt-4 py-2">
      <button className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors text-sm">
        <Heart className="w-4 h-4" /><span>Wishlist</span>
      </button>
      <button className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors text-sm">
        <Share2 className="w-4 h-4" /><span>Share</span>
      </button>
      <button className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors text-sm">
        <RefreshCw className="w-4 h-4" /><span>Compare</span>
      </button>
    </div>
  );
}

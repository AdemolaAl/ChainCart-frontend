import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageProps { image_of_land: string[]; }

export default function ProductImage({ image_of_land }: ProductImageProps) {
  const [selectedImage, setSelectedImage] = useState(image_of_land[0]);
  const handlePrev = () => {
    const index = image_of_land.indexOf(selectedImage);
    setSelectedImage(image_of_land[(index - 1 + image_of_land.length) % image_of_land.length]);
  };
  const handleNext = () => {
    const index = image_of_land.indexOf(selectedImage);
    setSelectedImage(image_of_land[(index + 1) % image_of_land.length]);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-[400px] h-[300px] rounded-2xl overflow-hidden border border-gray-800/50">
        <img src={selectedImage} alt="Product" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/30 to-transparent" />
        <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-2 rounded-full border border-gray-700/50 hover:border-cyan-500/40 transition-all" onClick={handlePrev}>
          <ChevronLeft className="text-gray-300" size={18} />
        </button>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-2 rounded-full border border-gray-700/50 hover:border-cyan-500/40 transition-all" onClick={handleNext}>
          <ChevronRight className="text-gray-300" size={18} />
        </button>
      </div>
      <div className="flex mt-3 space-x-2">
        {image_of_land.map((img, index) => (
          <img key={index} src={img} alt="Thumbnail"
            className={`w-16 h-16 object-cover rounded-xl cursor-pointer border-2 transition-all duration-300 ${selectedImage === img ? "border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "border-gray-800/50 opacity-60 hover:opacity-100"}`}
            onClick={() => setSelectedImage(img)} />
        ))}
      </div>
    </div>
  );
}

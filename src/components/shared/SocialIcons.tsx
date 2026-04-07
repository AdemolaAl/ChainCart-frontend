import { Facebook, Twitter, Instagram } from "lucide-react";

export default function SocialIcons() {
  return (
    <div className="flex space-x-5 justify-center mt-4">
      <a href="#" className="!text-gray-500 hover:!text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
        <Facebook />
      </a>
      <a href="#" className="!text-gray-500 hover:!text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
        <Twitter />
      </a>
      <a href="#" className="!text-gray-500 hover:!text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
        <Instagram />
      </a>
    </div>
  );
}

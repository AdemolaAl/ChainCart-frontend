import { Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/40 text-center py-10">
      <SocialIcons />
      <p className="text-gray-600 text-sm mt-6 tracking-wide">Copyright © 2025 © All rights reserved ChainCart</p>
      <div className="flex justify-center space-x-6 text-sm text-gray-500 mt-3">
        <Link to='/' className="!text-gray-500 hover:!text-cyan-400 transition-colors">Privacy Policy</Link>
        <Link to='/' className="!text-gray-500 hover:!text-cyan-400 transition-colors">Terms and Conditions</Link>
        <Link to='/' className="!text-gray-500 hover:!text-cyan-400 transition-colors">Cookie</Link>
      </div>
    </footer>
  );
}

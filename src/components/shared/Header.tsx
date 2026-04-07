import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import SwitchButton from "./SwitchButton";
import Notification from "./Notification";
import CategorySelector from "./CategorySelector";
import { headerMenu } from "@/CONSTANT/data";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "../search/SearchBar";
import XionWallet from "../Wallet/XionWallet";

interface IMobileMenu {
  isOpen: boolean;
  closeMobile: () => void;
  handleOutsideClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const MobileMenu: React.FC<IMobileMenu> = ({ isOpen, closeMobile, handleOutsideClick }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end md:hidden z-50"
        onClick={handleOutsideClick}
      >
        <div
          className="w-72 h-full bg-gray-950/95 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.1)] border-l border-cyan-500/20 flex flex-col items-center justify-center gap-6 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={closeMobile} className="absolute top-5 right-5 text-gray-400 hover:text-cyan-300 transition-colors">
            <X className="w-6 h-6" />
          </button>
          <SearchBar />
          <nav>
            <ul className="flex flex-col gap-4 text-lg">
              {headerMenu.map((item, index) => (
                <Link to={item.href} key={index} onClick={closeMobile}
                  className="!text-gray-300 hover:!text-cyan-300 cursor-pointer text-sm tracking-wide transition-colors">
                  {item.name}
                </Link>
              ))}
            </ul>
          </nav>
          <Notification />
          <SwitchButton />
          <XionWallet />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

interface ITopHeader { isOpen?: boolean; closeMobile?: () => void; }

const TopHeader: React.FC<ITopHeader> = ({ isOpen, closeMobile }) => (
  <section className="p-4 flex items-center justify-between gap-3 lg:container lg:mx-auto">
    <Logo />
    <div className="block md:hidden">
      <div className="flex items-center gap-4">
        <XionWallet />
        <button onClick={closeMobile} className="text-gray-400 hover:text-cyan-300 transition-colors">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
    <div className="hidden md:flex flex-1 justify-between items-center gap-6">
      <SearchBar />
      <Notification />
      <SwitchButton />
      <XionWallet />
    </div>
  </section>
);

const BottomHeader: React.FC = () => (
  <section className="p-3 flex items-center border-t border-gray-800/60 gap-6 container mx-auto">
    <CategorySelector />
    <nav className="hidden md:flex flex-1">
      <ul className="flex gap-6 justify-end w-full">
        {headerMenu.map((item, index) => (
          <Link to={item.href} key={index}
            className="!text-gray-400 hover:!text-cyan-300 cursor-pointer text-sm tracking-wide transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 hover:after:w-full after:transition-all after:duration-300">
            {item.name}
          </Link>
        ))}
      </ul>
    </nav>
  </section>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMobile = () => setIsOpen((prev) => !prev);
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  return (
    <header className="bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/40 sticky top-0 z-40">
      <TopHeader isOpen={isOpen} closeMobile={closeMobile} />
      <MobileMenu isOpen={isOpen} closeMobile={closeMobile} handleOutsideClick={handleOutsideClick} />
      <BottomHeader />
    </header>
  );
};

export default Header;

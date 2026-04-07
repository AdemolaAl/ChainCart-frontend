import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = ["Lands", "Duplex", "Mini Flats", "Bungalows"];

const CategorySelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="relative flex flex-col items-start gap-2">
      <div className="flex items-center gap-2 border border-gray-700/40 rounded-xl p-1.5 bg-gray-900/40">
        <Button size="icon" variant="ghost" className="text-gray-400 hover:text-cyan-300">
          <Menu className="w-5 h-5" />
        </Button>
        <Button className="flex items-center gap-2" variant="outline" size="sm"
          onClick={() => setIsOpen((prev) => !prev)}>
          All Categories
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </Button>
        {selectedCategory && (
          <div className="text-xs text-cyan-400 font-medium bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
            {selectedCategory}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "absolute left-0 top-full mt-2 w-48 bg-gray-900/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-xl z-50 border border-gray-700/50 overflow-hidden"
            )}
          >
            <ul className="py-2" onMouseLeave={() => setIsOpen(false)}>
              {categories.map((category) => (
                <li key={category}
                  className="px-4 py-2.5 hover:bg-cyan-500/10 cursor-pointer transition-colors text-gray-300 hover:text-cyan-300 text-sm"
                  onClick={() => { setSelectedCategory(category); setIsOpen(false); }}>
                  {category}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategorySelector;

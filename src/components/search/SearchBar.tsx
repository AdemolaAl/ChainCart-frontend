import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import SearchModal from "./SearchModal";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => { if (query.trim() !== "") setIsOpen(true); };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); handleSearch(); }
  };

  return (
    <div className="flex items-center lg:w-60">
      <Input type="text" placeholder="Search properties..."
        value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}
        className="w-full max-w-sm text-gray-200 placeholder:text-gray-600 border-gray-700/50 focus:border-cyan-500/50" />
      <SearchModal query={query} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default SearchBar;

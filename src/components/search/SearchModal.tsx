import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

Modal.setAppElement("#root");

interface SearchModalProps { query: string; isOpen: boolean; setIsOpen: (open: boolean) => void; }

const properties = [
  { title: "Swamp Land", size: "1 acre", price: "0.1 XION", location: "TBD", availability: "Available", searchText: ["Swamp Land", "Swamp Property"] },
  { title: "Duplex Islands", size: "Duplex Apartment", price: "0.2 XION", location: "TBD", availability: "Available", searchText: ["Duplex Property", "Duplex Islands"] },
  { title: "Mansion Islands", size: "Mansion Apartment", price: "0.25 XION", location: "TBD", availability: "Available", searchText: ["Mansion Property", "Mansion Islands"] },
];

const SearchModal: React.FC<SearchModalProps> = ({ query, isOpen, setIsOpen }) => {
  const [results, setResults] = useState<string>("");

  useEffect(() => {
    if (isOpen && query.trim() !== "") {
      const formattedQuery = query.toLowerCase();
      const matchingProperties = properties.filter((property) =>
        property.searchText.some((text) => formattedQuery.includes(text.toLowerCase()))
      );
      if (matchingProperties.length > 0) {
        setResults(matchingProperties.map((p) =>
          `**Title:** ${p.title}\n**Size:** ${p.size}\n**Price:** ${p.price}\n**Availability:** ${p.availability}`
        ).join("\n\n"));
      } else setResults("No matching properties found.");
    }
  }, [isOpen, query]);

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}
      className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full shadow-[0_0_60px_rgba(6,182,212,0.1)] mx-auto outline-none relative border border-gray-700/50"
      overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <Button variant="ghost" className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:text-cyan-300" onClick={() => setIsOpen(false)}>
        <X className="w-5 h-5" />
      </Button>
      <div className="pb-3 border-b border-gray-800/50">
        <h2 className="text-lg font-semibold text-white text-center">Search Results</h2>
        <p className="text-center text-gray-500 mt-1 text-sm">
          Query: <span className="font-semibold text-cyan-400">{query}</span>
        </p>
      </div>
      <div className="mt-4 text-gray-400 whitespace-pre-line max-h-80 overflow-y-auto p-2 text-sm">{results}</div>
    </Modal>
  );
};

export default SearchModal;

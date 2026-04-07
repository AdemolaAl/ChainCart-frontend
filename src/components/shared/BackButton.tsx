import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AppButton onClick={() => navigate(-1)}
      variant="ghost"
      className="flex items-center text-gray-400 hover:text-cyan-300 my-5 border border-gray-700/40 hover:border-cyan-500/30">
      <ChevronLeft className="h-5 w-5 mr-1" />
      <span className="text-sm tracking-wide">Go Back</span>
    </AppButton>
  );
};

export default BackButton;

import { motion } from "framer-motion";
import { useState } from "react";
import AppButton from "./AppButton";
import { useNavigate } from "react-router-dom";

export default function SwitchButton() {
  const [selected, setSelected] = useState<"buyer" | "seller">("buyer");
  const navigate = useNavigate();

  return (
    <section className="relative flex p-1 rounded-xl w-64 justify-center md:justify-start bg-gray-900/60 border border-gray-700/40">
      <motion.div
        className="absolute inset-y-1 w-1/2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
        animate={{ x: selected === "seller" ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <AppButton label="Buyer"
        variant={selected === "buyer" ? "ghost" : "ghost"}
        className={`px-4 w-1/2 rounded-lg relative z-10 text-center ${selected === "buyer" ? "text-cyan-300" : "text-gray-500"}`}
        onClick={() => { setSelected("buyer"); navigate("/"); }}
      />
      <AppButton label="Seller"
        variant="ghost"
        className={`px-4 w-1/2 rounded-lg relative z-10 text-center ${selected === "seller" ? "text-cyan-300" : "text-gray-500"}`}
        onClick={() => { setSelected("seller"); navigate("/seller"); }}
      />
    </section>
  );
}

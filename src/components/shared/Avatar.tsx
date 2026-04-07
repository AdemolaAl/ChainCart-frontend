import { Clipboard, User } from "lucide-react";
import useAuth from "../auth/hook/useAuth";
import { useEffect, useState, useRef } from "react";
import { RootState, useAppSelector } from "@/store";
import { useGetXionBalanceQuery } from "@/api/xionService";
import { maskAddress } from "@/utils/maskAddress";
import { toast } from "sonner";

export const AvatarMenu = () => {
  const [copied, setCopied] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const address = user?.walletAddress;
  const addressMasked = maskAddress(address || "0x0000000000000000000000000000000000000000");
  const { data } = useGetXionBalanceQuery(address, { skip: !address });
  const balance = data?.data?.balance || "0.00";
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address || "0x0000000000000000000000000000000000000000");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) { console.error("Failed to copy:", err); }
  };

  useEffect(() => { if (copied) toast.success("Copied to clipboard!"); }, [copied]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { handleLogout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && buttonRef.current &&
        (dropdownRef.current.contains(event.target as Node) || buttonRef.current.contains(event.target as Node))) return;
      setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, buttonRef]);

  return (
    <div className="relative">
      <button ref={buttonRef} onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700/50 hover:border-cyan-500/40 transition-all">
        <User className="text-cyan-400" size={18} />
      </button>
      {dropdownOpen && (
        <div ref={dropdownRef}
          className="absolute right-0 mt-2 w-52 bg-gray-900/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-700/50 rounded-xl py-3 px-4 max-h-64 overflow-y-auto z-30">
          <div className="flex items-center justify-between mt-1 text-gray-400 relative">
            <span className="text-sm font-mono truncate pr-6">{addressMasked}</span>
            <Clipboard size={14} className="cursor-pointer text-gray-500 hover:text-cyan-400 transition absolute right-0" onClick={copyToClipboard} />
          </div>
          <div className="mt-3 mb-3">
            <span className="text-sm bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full font-mono">
              {balance} XION
            </span>
          </div>
          <div className="w-full border-t border-gray-800 pt-2 mt-1">
            <button onClick={handleLogout}
              className="block w-full text-left px-2 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;

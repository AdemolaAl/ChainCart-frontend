import { Clipboard } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { RootState, useAppSelector } from "@/store";
import { maskAddress } from "@/utils/maskAddress";
import { useGetXionBalanceQuery } from "@/api/xionService";
import { useState } from "react";

const ProfileSection = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const address = user?.walletAddress;
  const addressMasked = maskAddress(address || "0x0000000000000000000000000000000000000000");
  const { data } = useGetXionBalanceQuery(address, { skip: !address });
  const balance = data?.data?.balance || "0.00";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address || "0x0000000000000000000000000000000000000000");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) { console.error("Failed to copy:", err); }
  };

  return (
    <Card className="w-full md:w-1/3 p-6 rounded-2xl bg-gray-900/60 backdrop-blur-xl border-gray-800/50">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-md opacity-40" />
          <Avatar className="w-24 h-24 border-2 border-cyan-500/40 relative z-10">
            <AvatarImage src="/avatar.jpg" alt="User Avatar" />
            <AvatarFallback className="bg-gray-800 text-cyan-400">JD</AvatarFallback>
          </Avatar>
        </div>

        <h2 className="text-xl font-semibold mt-4 text-white">John Doe</h2>

        <div className="flex items-center gap-2 mt-2 text-gray-400">
          <span className="text-sm font-mono">{addressMasked}</span>
          <Clipboard size={16} className="cursor-pointer text-gray-500 hover:text-cyan-400 transition" onClick={copyToClipboard} />
        </div>

        <div className="mt-4 text-lg font-medium">
          <span className="text-gray-500 text-sm">Balance:</span>
          <span className="ml-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 px-4 py-1.5 rounded-full text-base font-mono">
            {balance} XION
          </span>
        </div>

        <div className="mt-6 flex gap-3 w-full">
          <Button variant="outline" className="flex-1 text-xs">View Profile</Button>
          <Button variant="default" className="flex-1 text-xs">Edit Profile</Button>
        </div>

        {copied && <div className="mt-2 text-sm text-cyan-400 font-medium">Copied to clipboard!</div>}
      </div>
    </Card>
  );
};

export default ProfileSection;

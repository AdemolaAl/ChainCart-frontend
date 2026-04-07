import { useCallback, useState } from "react";
import AppButton from "../shared/AppButton";
import { Copy } from "lucide-react";
import { maskAddress } from "@/utils/maskAddress";
import { RootState, useAppSelector } from "@/store";
import { IApiResponse, IUserOrderHistory } from "@/@types/types";
import { useUpdateOrderStatusMutation } from "@/api/orderService";
import { useToast } from "@/hooks/useToast";
import useMeta from "@/hooks/useMeta";

interface HistoryCardProps { purchase: IUserOrderHistory; showActions?: boolean; }

export default function HistoryCard({ purchase, showActions = false }: HistoryCardProps) {
  const [copied, setCopied] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [releaseorCancelFund, { isLoading }] = useUpdateOrderStatusMutation();
  const toast = useToast();
  const { releaseOrCancelFund } = useMeta();

  const handleEscrowAction = useCallback(async (action: "release" | "cancel") => {
    toast.dismiss();
    const loadingToast = toast.loading(`${action} to wallet...`);
    try {
      if (!user?.walletAddress) { toast.dismiss(loadingToast); toast.error("Wallet address is required."); return; }
      const confirmTransaction = window.confirm(`You are about to ${action} Xion to the seller. Proceed?`);
      if (!confirmTransaction) { toast.dismiss(loadingToast); toast.info("Transaction cancelled."); return; }
      const releaseFundResult = await releaseOrCancelFund(user.walletAddress, action);
      if (releaseFundResult?.transactionHash) {
        const response: IApiResponse = await releaseorCancelFund({ status: action, orderId: purchase._id }).unwrap();
        toast.success(response.message);
      } else { toast.dismiss(loadingToast); toast.error(`Failed to ${action} funds.`); }
    } catch (error) { toast.dismiss(loadingToast); console.error("Error:", error); }
    finally { toast.dismiss(loadingToast); }
  }, [toast, user?.walletAddress, releaseOrCancelFund, releaseorCancelFund, purchase._id]);

  const { txHash, amount } = purchase.payment || {};

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(txHash); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch (error) { console.error("Failed to copy:", error); }
  };

  return (
    <div key={purchase._id} className="border border-gray-800/50 p-5 rounded-2xl bg-gray-900/40 backdrop-blur-sm hover:border-cyan-500/20 transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-gray-300 break-words text-sm">
          <strong className="text-gray-500 text-xs uppercase tracking-wider">TX Hash:</strong>{' '}
          <span className="font-mono text-cyan-400/80">{maskAddress(txHash)}</span>
        </p>
        <AppButton onClick={handleCopy} variant="ghost" size="sm"
          rightIcon={<Copy size={14} />} label={copied ? "Copied!" : "Copy"} />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
        <p className="text-gray-400"><span className="text-gray-600 text-xs block">Amount</span> <span className="text-cyan-400 font-mono">{amount} XION</span></p>
        <p className="text-gray-400"><span className="text-gray-600 text-xs block">Status</span> <span className="text-purple-400">{purchase.status}</span></p>
        <p className="text-gray-400"><span className="text-gray-600 text-xs block">Date</span> {new Date(purchase.createdAt).toLocaleString()}</p>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        {purchase.items.map((item) => (
          <div key={item._id} className="flex items-center gap-3 border border-gray-800/30 p-3 rounded-xl bg-gray-950/30">
            {item.product?.image_of_land && (
              <img src={item.product.image_of_land} alt="Product" className="w-20 h-20 object-cover rounded-lg" />
            )}
            <div>
              <p className="font-semibold text-cyan-400 text-sm font-mono">{item?.price} XION</p>
              <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      {showActions && (
        <div className="mt-4 flex gap-3">
          <AppButton variant="destructive" size="sm" isLoading={isLoading} disabled={isLoading || !user?.walletAddress}
            onClick={() => handleEscrowAction("cancel")} label="Cancel Order" />
          <AppButton size="sm" isLoading={isLoading} disabled={isLoading || !user?.walletAddress}
            onClick={() => handleEscrowAction("release")} label="Release Fund" />
        </div>
      )}
    </div>
  );
}

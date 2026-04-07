import { useKeplr } from "@/hooks/useKeplr";
import React, { useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { maskAddress } from "@/utils/maskAddress";
import { useWalletAuthMutation } from "@/api/authService";
import { setAuthenticated } from "@/features/authSlice";
import { IApiResponse, IUserResponse } from "@/@types/types";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import AppButton from "../shared/AppButton";
import AuthStore from "@/utils/AuthStore";
import { useToast } from "@/hooks/useToast";

interface IWalletConnectProps {
  buttonProps?: React.ComponentProps<typeof Button>;
}

export const WalletConnect: React.FC<IWalletConnectProps> = ({ buttonProps }) => {
  const { address, connect, disconnect } = useKeplr();
  const [walletAuth, { isLoading }] = useWalletAuthMutation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (address && !isAuthenticated) handleAuth();
  }, [address, isAuthenticated]);

  const handleConnect = async () => { setLoading(true); await connect(); };

  const handleAuth = useCallback(async () => {
    if (!address) return;
    toast.dismiss();
    const loadingToast = toast.loading("Authenticating wallet...");
    try {
      const response: IApiResponse = await walletAuth({ walletAddress: address }).unwrap();
      toast.dismiss(loadingToast);
      if (response.status === 200) {
        const successResponse = response.data as IUserResponse;
        dispatch(setAuthenticated({
          isAuthenticated: true,
          user: { id: successResponse.accessToken, roles: successResponse.result!.role, walletAddress: successResponse.result!.walletAddress },
        }));
        AuthStore.setAccessToken(successResponse.accessToken);
        toast.success("Wallet connected successfully!");
      } else {
        toast.error(response.message || "Authentication failed", {
          action: <Button onClick={handleAuth} variant="outline" size="sm">Retry</Button>,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Wallet authentication failed.", {
        action: <Button onClick={handleAuth} variant="outline" size="sm">Retry</Button>,
      });
      console.error("Wallet Auth Error:", error);
    } finally { setLoading(false); }
  }, [address, walletAuth, dispatch]);

  const handleDisconnect = () => {
    if (window.confirm("Disconnect your wallet?")) {
      disconnect();
      AuthStore.removeAccessToken();
      dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
      setOpen(false);
      toast.success("Wallet disconnected.");
    }
  };

  return (
    <div>
      {isAuthenticated && user?.walletAddress ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AppButton variant="default" className="flex items-center gap-2 px-4 py-2 w-full"
            {...buttonProps} size="lg" onClick={() => setOpen(!open)}>
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="bg-gray-800 text-cyan-400 text-xs">{user.walletAddress.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-mono text-sm">{maskAddress(user.walletAddress)}</span>
          </AppButton>
          {open && (
            <div className="w-56 p-4 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-xl mt-2">
              <p className="text-sm font-semibold text-gray-200 font-mono">{maskAddress(user.walletAddress)}</p>
              <p className="text-xs text-gray-500">{user.roles.join(" and ")}</p>
              <AppButton variant="destructive" className="w-full mt-3" size="sm" onClick={handleDisconnect}>
                Disconnect Wallet
              </AppButton>
            </div>
          )}
        </motion.div>
      ) : (
        <AppButton variant="default" onClick={handleConnect} isLoading={loading || isLoading}
          className="w-full py-2 text-center" {...buttonProps} label="Connect Wallet" />
      )}
    </div>
  );
};

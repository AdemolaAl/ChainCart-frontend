import { Bell, MessageCircle, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState, useAppSelector } from "@/store";

export default function Notification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantity } = useAppSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const NotiData = [
    { icon: (className: string) => <ShoppingCart className={className} />, count: isAuthenticated ? totalQuantity : 1, path: "/shop/buyer_cart" },
    { icon: (className: string) => <Bell className={className} />, count: 0, path: "/" },
    { icon: (className: string) => <MessageCircle className={className} />, count: 5, path: "/" },
  ];

  return (
    <section className="flex gap-2">
      {NotiData.map((item, index) => (
        <ButtonWithIcon key={index} icon={item.icon} count={item.count}
          isActive={location.pathname === item.path} onPress={() => navigate(item.path)} />
      ))}
    </section>
  );
}

interface IButtonWithIcon<T = void> {
  icon: (className: string) => React.ReactNode;
  count?: number;
  isActive: boolean;
  onPress: () => T;
}

export function ButtonWithIcon({ icon, count, isActive, onPress }: IButtonWithIcon) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 
        ${count && count > 0 ? "border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20" : "bg-transparent hover:bg-gray-800/50 border border-transparent"}
        ${isActive ? "text-cyan-400" : "text-gray-500"}`}
      onClick={onPress}
    >
      {icon(isActive ? "text-cyan-400" : count && count > 0 ? "text-cyan-400" : "text-gray-500")}
      {count && count > 0 && (
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]">
          {count}
        </motion.span>
      )}
    </motion.button>
  );
}

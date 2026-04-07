import { Card, CardContent } from "@/components/ui/card";
import AppButton from "../shared/AppButton";
import { useCartActions } from "@/hooks/useCartActions";
import { useState, useEffect } from "react";
import CartItemCard from "./CartItemCard";
import useSetCart from "@/hooks/useSetCart";
import { useAppDispatch } from "@/store";
import { setQuantity as setQuantityFromReducer } from "@/features/cartSlice";
import { useMetaAction } from "@/hooks/useMetaAction";

export default function BuyerCartTab() {
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const dispatch = useAppDispatch();
  const { cart } = useSetCart();

  useEffect(() => {
    if (!cart?.items) return;
    const initialQuantities: Record<string, number> = {};
    cart.items.forEach((item) => { initialQuantities[item._id] = item.quantity; });
    setItemQuantities(initialQuantities);
  }, [cart?.items.length]);

  const { handleRemoveCart, handleClearCart, removeLoad, deleteLoad } = useCartActions();
  const { handleBuyFromMeta, buyLoad, orderConfirmLoad, keepLoad } = useMetaAction();

  const incrementItem = (itemId: string) => {
    setItemQuantities((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    dispatch(setQuantityFromReducer({ _id: itemId, quantity: itemQuantities[itemId] + 1 || 1 }));
  };

  const decrementItem = (itemId: string) => {
    setItemQuantities((prev) => ({ ...prev, [itemId]: Math.max(1, (prev[itemId] || 1) - 1) }));
    dispatch(setQuantityFromReducer({ _id: itemId, quantity: Math.max(1, itemQuantities[itemId] - 1 || 1) }));
  };

  const calculateItemTotal = (itemId: string, price: number) => price * (itemQuantities[itemId] || 1);
  const calculateCartTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => total + calculateItemTotal(item._id, item.price), 0);
  };

  return (
    <div className="w-full mx-auto py-4">
      <Card className="bg-gray-900/40 border-gray-800/50">
        <CardContent>
          {cart.items.length > 0 ? (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItemCard key={item._id} item={item} itemQuantities={itemQuantities}
                  incrementItem={incrementItem} decrementItem={decrementItem}
                  handleBuyFromCart={handleBuyFromMeta} handleRemoveCart={handleRemoveCart}
                  buyLoad={buyLoad} orderConfirmLoad={orderConfirmLoad}
                  keepLoad={keepLoad} removeLoad={removeLoad} />
              ))}
              <div className="flex justify-between items-center pt-4 border-t border-gray-800/40">
                <span className="text-xl font-bold text-white font-mono">
                  Total: <span className="text-cyan-400">${calculateCartTotal()}</span>
                </span>
                <AppButton disabled={true} onClick={() => {}} className="px-6 py-2" label="Checkout" />
              </div>
              <div className="pt-4 flex justify-end">
                <AppButton onClick={() => handleClearCart(cart._id)} variant="destructive"
                  className="px-6 py-2" label="Delete All" isLoading={deleteLoad} />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

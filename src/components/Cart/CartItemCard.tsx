import { CartItem } from "@/@types/types";
import AppButton from "../shared/AppButton";
import QuantitySelector from "../shared/QuantitySelector";

interface CartItemProps {
  item: CartItem; itemQuantities: Record<string, number>;
  incrementItem: (itemId: string) => void; decrementItem: (itemId: string) => void;
  handleBuyFromCart: (productId: string, quantity: number) => void;
  handleRemoveCart: (productId: string, quantity: number) => void;
  buyLoad: boolean; orderConfirmLoad: boolean; keepLoad: boolean; removeLoad: boolean;
}

export default function CartItemCard({
  item, itemQuantities, incrementItem, decrementItem,
  handleBuyFromCart, handleRemoveCart, buyLoad, orderConfirmLoad, keepLoad, removeLoad,
}: CartItemProps) {
  const itemTotal = item.price * (itemQuantities[item._id] || item.quantity);

  return (
    <div className="flex items-center gap-4 border-b border-gray-800/40 pb-4">
      <div className="relative rounded-xl overflow-hidden">
        <img src={item?.product?.image_of_land} alt={item?.product?.title}
          className="w-20 h-20 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-white">{item?.product?.title}</h3>
        <p className="text-sm text-gray-500">{item?.product?.description}</p>
        <p className="font-bold text-lg text-cyan-400 font-mono">${itemTotal.toFixed(6)}</p>
        {item?.product?.stock >= (itemQuantities[item._id] || item.quantity) ? (
          <p className="text-cyan-400/80 text-xs tracking-wider uppercase">IN STOCK ({item?.product?.stock} available)</p>
        ) : (
          <p className="text-red-400 text-xs tracking-wider uppercase">OUT OF STOCK</p>
        )}
        <QuantitySelector quantity={itemQuantities[item._id] || item.quantity}
          decrement={() => decrementItem(item._id)} increment={() => incrementItem(item._id)} />
      </div>
      <div className="flex flex-col space-y-2">
        <AppButton onClick={() => handleBuyFromCart(item?.product?._id, itemQuantities[item._id] || item.quantity)}
          className="px-4 py-2 w-full" label="Buy" size="sm"
          isLoading={buyLoad || orderConfirmLoad || keepLoad} />
        <AppButton onClick={() => handleRemoveCart(item?.product?._id, itemQuantities[item._id] || item.quantity)}
          className="px-4 py-2 w-full" label="Remove" variant="destructive" size="sm" isLoading={removeLoad} />
      </div>
    </div>
  );
}

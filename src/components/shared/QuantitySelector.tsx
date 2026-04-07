import AppButton from "../shared/AppButton";

interface QuantitySelectorProps { quantity: number; increment: () => void; decrement: () => void; }

export default function QuantitySelector({ quantity, increment, decrement }: QuantitySelectorProps) {
  return (
    <div className="flex items-center justify-between mt-2 border border-gray-700/40 rounded-full p-1 w-full bg-gray-900/40">
      <AppButton onClick={decrement} disabled={quantity === 0} variant="ghost" size="sm"
        className={`rounded-full px-3 ${quantity === 0 ? "text-gray-600 cursor-not-allowed" : "text-gray-300 hover:text-cyan-300"}`}
        label="-" />
      <span className="text-sm font-mono font-medium text-cyan-300">{quantity}</span>
      <AppButton onClick={increment} variant="ghost" size="sm"
        className="rounded-full px-3 text-gray-300 hover:text-cyan-300" label="+" />
    </div>
  );
}

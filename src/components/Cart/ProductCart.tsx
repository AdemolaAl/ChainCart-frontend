import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProductProps {
  title: string; image: string; price: number;
  discountPrice?: number; discount?: number; inStock: boolean;
}

export default function ProductCart({ title, image, price, discountPrice, discount, inStock }: ProductProps) {
  const [quantity, setQuantity] = useState(0);

  return (
    <Card className="p-4 rounded-2xl bg-gray-900/60 border-gray-800/50 relative group hover:border-cyan-500/25 transition-all duration-300">
      {discount && (
        <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {discount}%
        </span>
      )}
      <div className="overflow-hidden rounded-xl">
        <img src={image} alt={title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <h3 className="text-sm font-semibold mt-3 text-white">{title}</h3>
      <p className={`text-xs tracking-wider uppercase ${inStock ? "text-cyan-400/80" : "text-red-400"}`}>
        {inStock ? "IN STOCK" : "OUT OF STOCK"}
      </p>
      <div className="flex items-center space-x-2 mt-2">
        {discountPrice ? (
          <>
            <p className="text-cyan-400 font-bold font-mono">${discountPrice}</p>
            <p className="line-through text-gray-600 text-sm">${price}</p>
          </>
        ) : (
          <p className="font-bold text-cyan-400 font-mono">${price}</p>
        )}
      </div>
      <div className="flex justify-between mt-3 border border-gray-700/40 rounded-full p-1 bg-gray-900/40">
        <Button variant="ghost" size="sm" className="rounded-full px-3" onClick={() => setQuantity(Math.max(0, quantity - 1))}>-</Button>
        <input type="text" value={quantity} readOnly className="w-10 text-center bg-transparent text-cyan-300 font-mono" />
        <Button variant="ghost" size="sm" className="rounded-full px-3" onClick={() => setQuantity(quantity + 1)}>+</Button>
      </div>
    </Card>
  );
}

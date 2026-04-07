import { IProduct } from "@/@types/types";
import { Link } from "react-router-dom";

export interface ShopCardProps extends IProduct {
  price: number;
  discountPrice?: number;
  discount?: number;
  inStock: boolean;
}

export default function ShopCard({
  title, image_of_land, price, discountPrice, discount, stock, _id,
}: ShopCardProps) {
  return (
    <div className="border border-gray-800/50 p-4 rounded-2xl bg-gray-900/60 relative group hover:border-cyan-500/25 transition-all duration-300">
      {discount && (
        <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {discount}%
        </span>
      )}
      <div className="overflow-hidden rounded-xl">
        <img src={image_of_land} alt={title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <h3 className="text-sm font-semibold mt-3 text-white">{title}</h3>
      {stock > 0 ? (
        <p className="text-cyan-400/80 text-xs tracking-wider uppercase">IN STOCK {stock}</p>
      ) : (
        <p className="text-red-400 text-xs tracking-wider uppercase">OUT OF STOCK</p>
      )}
      <div className="flex items-center space-x-2 mt-2">
        {discountPrice ? (
          <>
            <p className="text-cyan-400 font-bold font-mono">${discountPrice}</p>
            <p className="line-through text-gray-600 text-sm">{price} XION</p>
          </>
        ) : (
          <p className="font-bold text-cyan-400 font-mono">{price} XION</p>
        )}
      </div>
      <Link to={`/shop/${_id}`}
        className="mt-3 block bg-gray-800/40 border border-gray-700/40 text-center py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-cyan-300 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300">
        View Details
      </Link>
    </div>
  );
}

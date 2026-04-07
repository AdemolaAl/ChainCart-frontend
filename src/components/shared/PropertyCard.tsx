import { Card, CardContent } from "@/components/ui/card";
import AppButton from "./AppButton";
import { RootState, useAppSelector } from "@/store";
import { IProduct } from "@/@types/types";
import { useProductActions } from "@/hooks/useProductActions";

export interface PropertyCardProps extends IProduct {
  discount?: number; oldPrice?: number; newPrice?: number;
  reviews: number; onPress?: () => void; isAddToCart?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  image_of_land, discount, oldPrice, newPrice, title, mapping_location,
  reviews, price, stock, isAddToCart = false, _id
}) => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const { isAddingToCart, handleAddToCart } = useProductActions(_id);

  return (
    <Card className="border border-gray-800/60 hover:border-cyan-500/30 shadow-none hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] rounded-2xl overflow-hidden p-0 group transition-all duration-500">
      <div className="relative w-full overflow-hidden">
        {discount && discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            {discount}% OFF
          </span>
        )}
        <img src={image_of_land} alt={title}
          className="w-full h-[150px] sm:h-[180px] md:h-[150px] object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
      </div>

      <CardContent className="px-4 py-3">
        <h3 className="text-base font-semibold text-white truncate">{title}</h3>
        <p className="text-gray-500 text-xs mt-1">Lat: {mapping_location.lat}</p>
        <p className="text-gray-500 text-xs">Lng: {mapping_location.lng}</p>

        <div className="flex items-center gap-2 mt-3">
          {oldPrice && <span className="text-gray-600 line-through text-sm">{oldPrice} XION</span>}
          <span className="text-cyan-400 text-lg font-bold">{newPrice || price} <span className="text-xs text-gray-500">XION</span></span>
        </div>

        <p className="text-gray-500 text-xs mt-2">Available: <span className="text-cyan-400/80">{stock}</span></p>
        {reviews > 0 && <p className="text-gray-600 text-xs">{reviews} Reviews</p>}

        {isAddToCart && isAuthenticated && (
          <AppButton label="Add To Cart" isLoading={isAddingToCart} onClick={handleAddToCart}
            className="w-full mt-4" size="sm" />
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;

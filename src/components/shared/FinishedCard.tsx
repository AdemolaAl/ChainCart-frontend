import { Card, CardContent } from "@/components/ui/card";
import { RootState, useAppSelector } from "@/store";
import AppButton from "./AppButton";

interface FinishedCardProps {
  image: string; discount?: number; title: string; description: string;
  date: string; category: string; btnLabel?: string;
}

const FinishedCard: React.FC<FinishedCardProps> = ({
  image, discount, title, description, date, category, btnLabel = "Shop Now",
}) => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  return (
    <Card className="border border-gray-800/50 hover:border-cyan-500/25 rounded-2xl overflow-hidden group transition-all duration-500">
      <div className="relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent" />
        {discount && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
      </div>
      <CardContent className="p-5">
        <p className="text-cyan-500/70 text-xs uppercase tracking-wider">{category}</p>
        <h3 className="text-white text-base font-semibold truncate mt-1">{title}</h3>
        <p className="text-gray-500 text-sm truncate">{description}</p>
        <p className="text-gray-600 text-xs mt-2">{date}</p>
        {isAuthenticated && (
          <AppButton label={btnLabel} onClick={() => {}} className="w-full mt-4" size="sm" />
        )}
      </CardContent>
    </Card>
  );
};

export default FinishedCard;

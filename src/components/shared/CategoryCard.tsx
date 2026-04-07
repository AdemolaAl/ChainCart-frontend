import { CategoryCardProps } from "@/@types/types";
import { Card, CardContent } from "@/components/ui/card";

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, count }) => {
  return (
    <Card className="flex items-center p-4 space-x-4 bg-gray-900/50 border border-gray-800/50 hover:border-cyan-500/30 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]">
      <img src={image} alt={title} width={60} height={60}
        className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300" />
      <CardContent className="p-0">
        <h3 className="text-sm font-semibold text-gray-200 group-hover:text-cyan-300 transition-colors">{title}</h3>
        <p className="text-gray-500 text-xs">{count} Items</p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;

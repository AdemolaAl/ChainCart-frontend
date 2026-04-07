import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PromoBannerProps } from "@/@types/types";

const PromoBanner: FC<PromoBannerProps> = ({ discountText, title, subTitle, buttonText, imageUrl }) => {
  return (
    <Card className="overflow-hidden rounded-2xl border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-950/80 w-full group hover:border-cyan-500/20 transition-all duration-500">
      <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
        <div className="sm:w-1/2">
          <p className="text-cyan-400 text-sm font-semibold mb-2 tracking-wide">{discountText}</p>
          <h2 className="text-2xl font-bold mb-1 text-white">{title}</h2>
          <p className="text-gray-400 mb-4 text-sm">{subTitle}</p>
          <Button variant="default" size="sm">{buttonText}</Button>
        </div>
        <div className="sm:w-1/2 flex justify-center">
          <img src={imageUrl} alt={title} className="object-contain w-full max-w-xs h-auto group-hover:scale-105 transition-transform duration-500" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PromoBanner;

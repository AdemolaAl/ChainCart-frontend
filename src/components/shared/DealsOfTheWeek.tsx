import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface DealsOfTheWeekProps {
  image: string; discount: number; oldPrice: number; newPrice: number;
  title: string; location: string; stock: number; available: number; endTime: string;
}

const DealsOfTheWeek: React.FC<DealsOfTheWeekProps> = ({
  image, discount, oldPrice, newPrice, title, location, stock, available, endTime,
}) => {
  const [timeLeft, setTimeLeft] = useState("0h:00m:00s");

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${hours}h : ${minutes}m : ${seconds}s`);
      } else {
        clearInterval(countdown);
        setTimeLeft("Offer expired");
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [endTime]);

  return (
    <Card className="border border-gray-800/60 p-6 rounded-2xl bg-gray-900/60 backdrop-blur-sm">
      <h2 className="text-sm font-medium text-gray-400 text-center tracking-wider uppercase">
        Deals of the <span className="text-cyan-400 font-bold text-base">WEEK!</span>
      </h2>
      <p className="text-cyan-400 font-mono font-bold text-lg mt-2 text-center tracking-wider">{timeLeft}</p>

      <div className="flex items-center gap-3 mt-3 justify-center">
        <span className="text-cyan-400 text-xl font-bold">{discount}%</span>
        <span className="text-gray-500 text-sm">Discount</span>
      </div>

      <img src={image} alt={title} width={200} height={150} className="mx-auto my-4 rounded-xl border border-gray-800/40" />

      <div className="text-center">
        <p className="text-gray-600 line-through text-sm">${oldPrice.toFixed(2)}</p>
        <p className="text-cyan-400 text-2xl font-bold">${newPrice.toFixed(2)}</p>
        <p className="text-white text-base font-semibold mt-1">{title}</p>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>

      <p className="text-cyan-400 text-xs font-semibold mt-3 tracking-wider uppercase">In Stock</p>
      <Progress value={(available / stock) * 100} className="w-full h-1.5 mt-2" />
      <p className="text-gray-600 text-xs mt-1">Available: {available}</p>
    </Card>
  );
};

export default DealsOfTheWeek;

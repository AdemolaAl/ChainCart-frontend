interface FeatureItem { icon: string; text: string; }

const features: FeatureItem[] = [
  { icon: "🛒", text: "Everyday new developments" },
  { icon: "🚚", text: "Free information on locations" },
  { icon: "💰", text: "Daily Mega Discounts" },
  { icon: "🏆", text: "Best price on the market" },
];

export default function FeatureList() {
  return (
    <div className="bg-gray-950/60 border-y border-gray-800/40 py-6">
      <div className="container mx-auto flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-gray-400 hover:text-cyan-300 transition-colors">
            <span className="text-xl">{feature.icon}</span>
            <p className="text-sm">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

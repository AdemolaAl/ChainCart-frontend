import React from "react";
import { Button } from "../ui/button";

const HeroSection: React.FC = () => {
  return (
    <section
      className="flex items-center justify-start relative py-28 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(2,6,23,0.95), rgba(8,47,73,0.85), rgba(15,23,42,0.9)), 
        url("https://res.cloudinary.com/devgodfrey/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742961439/house-chaincart_hdvbqw.jpg")`,
      }}
    >
      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      
      {/* Glowing orb */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="bg-gray-900/40 backdrop-blur-xl border border-cyan-500/20 p-8 md:p-12 rounded-2xl max-w-lg shadow-[0_0_40px_rgba(6,182,212,0.08)]">
          <p className="text-cyan-400 text-sm uppercase tracking-[0.2em] font-medium mb-3">Decentralized Marketplace</p>
          <h1 className="!text-2xl md:!text-4xl lg:!text-5xl font-bold text-white mb-6 leading-tight">
            Find Your Dream Home <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">On-Chain</span>
          </h1>
          <Button variant="default" className="text-white px-8 py-3 lg:text-base font-semibold" aria-label="Shop Now">
            Explore Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

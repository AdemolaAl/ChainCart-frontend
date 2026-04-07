import * as IMG from './../../assets'

export default function ShopBanner() {
  return (
    <div className="relative w-full h-56 bg-cover bg-center rounded-2xl overflow-hidden"
      style={{ backgroundImage: `url(${IMG.ShopBanner})` }}>
      <div className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm flex flex-col justify-center items-center text-white text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80">Specialize in Real Estate</p>
        <h1 className="text-3xl font-bold mt-2">Business</h1>
      </div>
    </div>
  );
}

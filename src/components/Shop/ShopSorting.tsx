export default function ShopSorting() {
  return (
    <div className="flex justify-end p-4">
      <label className="text-gray-400 mr-2 text-sm">Sort by:</label>
      <select className="border border-gray-700/50 bg-gray-900/60 rounded-lg p-2 text-sm text-gray-300 outline-none focus:border-cyan-500/50">
        <option>Alphabetically, A-Z</option>
        <option>Price, Low to High</option>
        <option>Price, High to Low</option>
      </select>
    </div>
  );
}

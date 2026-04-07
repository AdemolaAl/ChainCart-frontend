const propertyTypes = [
  "Lands", "Block of Flats", "Duplex", "Mini Flat",
  "Townhouse/Terrace", "Studio Apartment", "Shared Apartment",
  "Sky Scrapers", "Bed-sitter"
];

const conditions = [
  { label: "Fairly Used", count: 8 },
  { label: "Newly Built", count: 36 },
  { label: "Renovated", count: 1 },
  { label: "Uncompleted", count: 16 },
];

export default function ShopFilters() {
  return (
    <aside className="w-64 p-5 bg-gray-900/60 border-r border-gray-800/40 rounded-2xl">
      <h3 className="font-semibold mb-3 text-gray-300 text-xs uppercase tracking-wider">Property Type</h3>
      {propertyTypes.map((type) => (
        <label key={type} className="flex items-center space-x-2 text-gray-400 mb-1 text-sm hover:text-cyan-300 transition-colors cursor-pointer">
          <input type="checkbox" className="form-checkbox accent-cyan-500 rounded" />
          <span>{type}</span>
        </label>
      ))}

      <h3 className="font-semibold mt-5 mb-3 text-gray-300 text-xs uppercase tracking-wider">Condition</h3>
      {conditions.map(({ label, count }) => (
        <label key={label} className="flex items-center space-x-2 text-gray-400 mb-1 text-sm hover:text-cyan-300 transition-colors cursor-pointer">
          <input type="checkbox" className="form-checkbox accent-cyan-500 rounded" />
          <span>{label} ({count})</span>
        </label>
      ))}

      <h3 className="font-semibold mt-5 mb-3 text-gray-300 text-xs uppercase tracking-wider">Price</h3>
      <div className="flex space-x-2">
        <input type="number" placeholder="From" className="w-1/2 border border-gray-700/50 bg-gray-900/60 rounded-lg p-2 text-sm text-gray-300 placeholder:text-gray-600 outline-none focus:border-cyan-500/50" />
        <input type="number" placeholder="To" className="w-1/2 border border-gray-700/50 bg-gray-900/60 rounded-lg p-2 text-sm text-gray-300 placeholder:text-gray-600 outline-none focus:border-cyan-500/50" />
      </div>

      <h3 className="font-semibold mt-5 mb-3 text-gray-300 text-xs uppercase tracking-wider">Availability</h3>
      <label className="flex items-center space-x-2 text-gray-400 mb-1 text-sm hover:text-cyan-300 transition-colors cursor-pointer">
        <input type="checkbox" className="form-checkbox accent-cyan-500 rounded" />
        <span>In Stock (62)</span>
      </label>
      <label className="flex items-center space-x-2 text-gray-400 mb-1 text-sm hover:text-cyan-300 transition-colors cursor-pointer">
        <input type="checkbox" className="form-checkbox accent-cyan-500 rounded" />
        <span>Out of Stock (0)</span>
      </label>
    </aside>
  );
}

export default function ReviewsTab() {
  return (
    <div className="text-gray-400 p-4 w-full">
      <h3 className="font-semibold mb-3 text-white text-sm">User Reviews (2)</h3>
      <div className="border-b border-gray-800/40 pb-3">
        <p className="text-sm font-semibold text-cyan-400/80">John Doe</p>
        <p className="text-sm text-gray-500">Great product! Really satisfied with the purchase.</p>
      </div>
      <div className="mt-3">
        <p className="text-sm font-semibold text-cyan-400/80">Jane Smith</p>
        <p className="text-sm text-gray-500">The quality exceeded my expectations. Would recommend!</p>
      </div>
    </div>
  );
}

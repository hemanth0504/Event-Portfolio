export default function EventSidebar({ selected, onSelect, categories = [], loading }) {
  return (
    <aside className="w-60 shrink-0 border-r pr-4">
      <h2 className="text-lg font-semibold mb-4 text-[#2B2B2B]">Filter by Category</h2>
      <ul className="space-y-2 text-[#6B6B6B] text-sm">
       {categories.map((cat) => (
  <li key={cat._id}>
    <button
      onClick={() => onSelect(cat)}
      disabled={loading}
      className={`text-left w-full hover:text-[#D9A5B3] transition ${
        selected._id === cat._id ? "text-[#D9A5B3] font-medium" : ""
      }`}
    >
      {cat.name}
    </button>
  </li>
))}

      </ul>
    </aside>
  );
}

export default function EventSidebar({ selected, onSelect, categories = [], loading }) {
  return (
    <div className="w-full flex flex-col items-center py-6">
      <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-6 prata-regular"> Events</h2>

      <div className="flex flex-wrap gap-3 border border-[#EAEAEA] rounded-full px-2 py-1 bg-white">

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => onSelect(cat)}
            disabled={loading}
            className={`px-6 py-2 rounded-full transition font-medium
              ${
                selected?._id === cat._id
                  ? "bg-[#D9A5B3] text-white"
                  : "text-[#6B6B6B] hover:text-[#D9A5B3]"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

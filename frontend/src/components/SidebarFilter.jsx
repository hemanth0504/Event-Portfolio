import { useEffect, useState } from "react";
import axios from "axios";

export default function SidebarFilter({ selected, onSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products/categories")
      .then((res) => setCategories(["All", ...res.data]))
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  return (
    <aside className="w-60 shrink-0 border-r pr-4">
      <h2 className="text-lg font-semibold mb-4 text-[#2B2B2B]">Filter by Category</h2>

      <ul className="space-y-2 text-[#6B6B6B] text-sm">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onSelect(cat)}
              className={`text-left w-full hover:text-[#D9A5B3] transition ${
                selected === cat ? "text-[#D9A5B3] font-medium" : ""
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

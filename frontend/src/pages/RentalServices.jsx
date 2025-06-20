import { useState, useEffect } from "react";
import axios from "../lib/axios.js";
import SidebarFilter from "../components/SidebarFilter.jsx";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState({ _id: "All", name: "All" });
  const [products, setProducts] = useState([]);
  const [rentalDates, setRentalDates] = useState({}); // track by product ID

  const { addToCart } = useCartStore();
  const { user } = useUserStore();

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }

    const { rentalStart, rentalEnd } = rentalDates[product._id] || {};

    if (!rentalStart || !rentalEnd) {
      toast.error("Please select rental start and end dates");
      return;
    }

   addToCart({
  productId: product._id,
  rentalStart,
  rentalEnd
});

  };

  const handleDateChange = (productId, field, value) => {
    setRentalDates((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    const endpoint =
      selectedCategory._id === "All"
        ? "/products"
        : `/products/category/${selectedCategory._id}`;

    axios
      .get(endpoint)
      .then((res) => setProducts(res.data.products || res.data))
      .catch((err) => console.error(err));
  }, [selectedCategory]);

  return (
    <div className="flex px-6 py-10 gap-8 bg-[#FFFAF8]">
      <SidebarFilter selected={selectedCategory} onSelect={setSelectedCategory} />

      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6 text-[#2B2B2B]">
          {selectedCategory.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const dates = rentalDates[product._id] || {};
            return (
              <div
                key={product._id}
                className="bg-white border rounded-md overflow-hidden shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-[#2B2B2B]">{product.name}</h3>
                  <p className="text-[#D9A5B3] font-medium text-sm">
                    ${product.pricePerDay}/day
                  </p>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">Rental Start:</label>
                    <input
                      type="date"
                      className="border p-1 text-sm rounded"
                      value={dates.rentalStart || ""}
                      onChange={(e) =>
                        handleDateChange(product._id, "rentalStart", e.target.value)
                      }
                    />
                    <label className="text-sm text-gray-600">Rental End:</label>
                   <input
  type="date"
  className="border p-1 text-sm rounded"
  value={dates.rentalEnd || ""}
  min={dates.rentalStart || ""}
  onChange={(e) =>
    handleDateChange(product._id, "rentalEnd", e.target.value)
  }
/>

                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 px-4 py-2 text-sm bg-[#D9A5B3] text-white rounded hover:bg-[#c88a99] transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

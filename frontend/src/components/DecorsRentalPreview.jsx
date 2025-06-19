import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../lib/axios";

export default function DecorsForRental() {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    axios
      .get("/products/featured")
      .then((res) => setFeaturedItems(res.data))
      .catch((err) => console.error("Failed to load featured items", err));
  }, []);

  return (
    <section className="bg-white py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#2B2B2B] mb-2 prata-regular">
          Decors For Rental
        </h2>
        <p className="text-[#6B6B6B] text-sm sm:text-base mb-10 max-w-xl mx-auto">
          Elegant items for any occasion — curated rentals in decor, lighting, furniture and more.
        </p>

        {/* Grid of Items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {featuredItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center text-center gap-3 bg-[#FCEEEE] border border-gray-200 rounded-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full aspect-square object-cover rounded-md"
              />

              <h3 className="text-[#2B2B2B] font-medium text-base mt-2">{item.name}</h3>
              <p className="text-xs text-[#8B8B8B]">
  {typeof item.category === "string" ? item.category : item.category?.name || "N/A"}
</p>

              <p className="text-sm font-semibold text-[#D9A5B3]">${item.pricePerDay}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <NavLink
          to="/services"
          className="inline-block mt-14 text-sm px-6 py-2 border border-[#D9A5B3] text-[#D9A5B3] font-medium rounded hover:bg-[#D9A5B3] hover:text-white transition-colors"
        >
          Explore All Rentals
        </NavLink>
      </div>
    </section>
  );
}

import { NavLink } from "react-router-dom";

const decorItems = [
  { title: "Backdrop", category: "Decor", price: 120 },
  { title: "Sets", category: "Theme", price: 300 },
  { title: "Garlands", category: "Florals", price: 50 },
  { title: "Florals", category: "Florals", price: 75 },
  { title: "Handi Tub", category: "Props", price: 40 },
  { title: "Sofa", category: "Furniture", price: 250 },
];

export default function DecorsForRental() {
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
          {decorItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-3">
              {/* Placeholder image */}
              <div className="w-full aspect-square bg-[#FCEEEE] border border-gray-200 rounded-md"></div>

              {/* Item Title */}
              <h3 className="text-[#2B2B2B] font-medium text-base">{item.title}</h3>

              {/* Category */}
              <p className="text-xs text-[#8B8B8B]">{item.category}</p>

              {/* Price */}
              <p className="text-sm font-semibold text-[#D9A5B3]">${item.price}</p>
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

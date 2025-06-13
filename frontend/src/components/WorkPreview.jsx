export default function WorkPreview() {
  const items = [
    { img: "/work1.jpg", label: "Floral Sculpture", span: "row-span-2" },
    { img: "/work2.jpg", label: "Stage Decor" },
    { img: "/work3.jpg", label: "Vastra Wall" },
    { img: "/work4.jpg", label: "Decor" },
    { img: "/work5.jpg", label: "Accessories" },
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className=" prata-regular text-3xl sm:text-4xl font-semibold text-[#2E2E2E] mb-2">
          Our Work
        </h2>
        <p className="text-[#5A5A5A] text-sm sm:text-base mb-10">
          Celebrations We’ve Transformed
        </p>

        {/* Grid layout */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-md shadow-sm group ${
                item.span || ""
              }`}
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-lg font-medium">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

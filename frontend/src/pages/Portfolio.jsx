export default function Portfolio() {
  const images = Array.from({ length: 12 }, (_, i) => `https://picsum.photos/seed/${i + 1}/600/40${i % 5 + 1}`);

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="text-center mt-10 mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold text-[rgb(46,46,46)] prata-regular">
          Portfolio
        </h2>
        <p className="text-[#5A5A5A] text-sm sm:text-base mt-2">
          A glimpse into our recent decor and event transformations.
        </p>
      </div>

      {/* Masonry Layout */}
      <section className="px-6 sm:px-12 pb-24 bg-white">
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((src, i) => (
            <div key={i} className="break-inside-avoid rounded-md overflow-hidden shadow-sm">
              <img
                src={src}
                alt={`Portfolio item ${i + 1}`}
                className="w-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

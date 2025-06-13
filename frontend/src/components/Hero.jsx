import { useState, useEffect } from "react";



export default function Hero() {
 const images = ["/4.jpg", "/5.jpg", "/6.jpg"];

    const [index, setIndex] = useState(0);

   useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 4 seconds per image

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="flex flex-col sm:flex-row border border-gray-100 bg-[#F9F6F1]">
      {/* Left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-20 px-6 sm:px-12">
        <div className="max-w-xl">
          {/* Branding Line + Subheading */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 sm:w-14 h-[2px] bg-[#A47551]"></div>
            <p className="text-[#A47551] tracking-widest text-xs sm:text-sm font-semibold uppercase py-3">
              Aadhya Signature Events
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="prata-regular text-5xl sm:text-6xl md:text-4xl text-[#2E2E2E] leading-tight mb-4">
            Rental & Decor Services <br /> Across New England
          </h1>

          {/* Subtext */}
          <p className="font-serif text-[#5A5A5A] text-base sm:text-lg md:text-sm  leading-relaxed">
            From timeless weddings to curated parties, we deliver elegance with every piece. Explore our collection of rentals, florals, and unforgettable designs.
          </p>
        </div>
      </div>

      {/* Right side */}
     <div className="w-full sm:w-1/2 h-[420px] sm:h-auto relative overflow-hidden">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Decor"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100 z-10" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

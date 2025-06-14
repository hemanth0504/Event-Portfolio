import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Jesse Donovan",
    role: "Event Director, IG Company",
    message:
      "Purus sed sagittis senectus mattis. Fringilla mi risus duis nunc sit.",
  },
  {
    name: "Aadhya Rao",
    role: "Bride",
    message:
      "The setup was breathtaking. Every floral and fabric detail felt perfectly curated — we truly had the dream celebration we imagined.",
  },
  {
    name: "Manoj Reddy",
    role: "Corporate Client",
    message:
      "A seamless experience from start to finish. Their attention to detail made our annual event unforgettable.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(slide);
  }, []);

  return (
    <div className="flex flex-col items-center text-center mb-14">
      {/* Heading */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#2B2B2B] mb-2 prata-regular">
          Testimonials
        </h2>
        <p className="text-[#6B6B6B] text-sm sm:text-base mb-10">
          What our clients say about their experience with us.
        </p>
      </div>

      {/* Slider Section */}
      <section className="bg-[#FFFAF8] py-16 px-6 sm:px-12 w-full">
        <div className="max-w-7xl mx-auto text-center overflow-hidden">
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((testimonial, i) => (
                <div key={i} className="min-w-full flex-shrink-0 px-6">
                  <div className="bg-white border border-gray-200 rounded-md px-8 py-10 shadow-sm">
                    <div className="flex flex-col items-center gap-4">
                      {/* Avatar initials */}
                      <div className="w-20 h-20 rounded-full bg-[#FCEEEE] flex items-center justify-center text-3xl text-[#D9A5B3] font-serif uppercase">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      {/* Name + Role */}
                      <div className="text-sm text-[#6B6B6B]">
                        <p className="font-medium text-[#2B2B2B]">
                          {testimonial.name}
                        </p>
                        <p>{testimonial.role}</p>
                      </div>

                      {/* Message */}
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">
                        “{testimonial.message}”
                      </p>

                      {/* Stars */}
                      <div className="flex gap-1 pt-2">
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <span key={i} className="text-[#D9A5B3] text-lg">
                              ★
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

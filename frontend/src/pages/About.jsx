import InfoStats from "../components/InfoStats";

export default function About() {
  return (
    <div className="w-full">
      {/* Heading Outside the Box */}
      <div className="text-center mt-10 mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#2B2B2B] prata-regular">
          About Us
        </h2>
      </div>

      {/* Info Section */}
      <section className="bg-[#FFFAF8] py-24 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: Description */}
            <div>
              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-2">
                Our Story
              </h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">
                Aadhya Signature Events began with a simple goal — to turn special moments into timeless memories. What started with intimate floral setups has grown into a full-scale decor and rental service across New England. We are a family-run business with a deep passion for aesthetic, culture, and detail.
              </p>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                From curated backdrops to custom florals, every piece we deliver is crafted with care. Whether it’s a wedding, engagement, or corporate gathering — we’re here to elevate your vision.
              </p>
            </div>

            {/* Right: Owner Profiles */}
            <div className="grid grid-cols-2 gap-6">
              {/* Owner 1 */}
              <div className="bg-white p-5 rounded-md shadow-sm text-center">
                <img
                  src="/owner1.jpg"
                  alt="Owner 1"
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-3"
                />
                <h4 className="text-[#2B2B2B] font-medium text-base">
                  Shilpa
                </h4>
                <p className="text-xs text-[#D9A5B3] mb-1">Creative Director</p>
                <p className="text-xs text-[#6B6B6B]">
                  Designs with soul, colors with meaning.
                </p>
              </div>

              {/* Owner 2 */}
              <div className="bg-white p-5 rounded-md shadow-sm text-center">
                <img
                  src="/owner2.jpg"
                  alt="Owner 2"
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-3"
                />
                <h4 className="text-[#2B2B2B] font-medium text-base">
                  Vineela
                </h4>
                <p className="text-xs text-[#D9A5B3] mb-1">Logistics Lead</p>
                <p className="text-xs text-[#6B6B6B]">
                  Precision in planning. Excellence in execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <div className="mb-12" />
      <InfoStats />
      <div className="mb-12" />
    </div>
  );
}

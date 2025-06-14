export default function Contact() {
  return (
    <div className="w-full">
      {/* Heading Outside the Box */}
      <div className="text-center mt-10 mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#2B2B2B] prata-regular">
          Contact Us
        </h2>
      </div>

      {/* Form + Map Section */}
      <section className="bg-[#FFFAF8] py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-[#FFF5F7] p-8 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold text-[#2B2B2B] mb-2">Get in touch</h3>
              <p className="text-sm text-[#6B6B6B] mb-6">
                We'd love to hear from you. Fill out the form and we’ll get back to you soon.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="p-3 border border-gray-300 rounded-md w-full bg-white text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="p-3 border border-gray-300 rounded-md w-full bg-white text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="p-3 border border-gray-300 rounded-md w-full bg-white text-sm"
                />
                <textarea
                  placeholder="Your message"
                  rows="4"
                  className="p-3 border border-gray-300 rounded-md w-full bg-white text-sm"
                />
                <button
                  type="submit"
                  className="bg-[#E8BCC7] text-white text-sm px-6 py-3 rounded hover:bg-[#D19CA9] transition-colors"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="rounded-md overflow-hidden shadow-sm">
              <iframe
                title="Our Location"
                className="w-full h-full min-h-[400px] rounded-md"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=123%20Blossom%20Avenue%20Boston%20MA&t=&z=13&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Margin below */}
      <div className="mb-24" />
    </div>
  );
}

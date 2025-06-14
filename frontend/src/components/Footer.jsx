export default function Footer() {
  return (
    <footer className="bg-[#FFFAF8] border-t border-gray-200 py-12 px-6 sm:px-12 text-sm text-[#6B6B6B]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">

        {/* Column 1: Branding */}
        <div className="flex-1">
          <p className="text-[#D9A5B3] uppercase tracking-widest font-semibold mb-3 text-xs">
            Aadhya Signature Events
          </p>
          <p className="leading-relaxed">
            Curating elegant, unforgettable events across New England. From florals to fine rentals — we bring your vision to life.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex-1">
          <p className="text-[#2B2B2B] font-medium mb-4">Quick Links</p>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-[#D9A5B3]">About Us</a></li>
            <li><a href="/work" className="hover:text-[#D9A5B3]">Our Work</a></li>
            <li><a href="/services" className="hover:text-[#D9A5B3]">Services</a></li>
            <li><a href="/contact" className="hover:text-[#D9A5B3]">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="flex-1">
          <p className="text-[#2B2B2B] font-medium mb-4">Contact</p>
          <p>hello@aadhyaevents.com</p>
          <p className="mt-2">+1 (555) 123-4567</p>
          <p className="mt-2">
            123 Blossom Avenue<br />
            Boston, MA 02118
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Instagram" className="hover:text-[#D9A5B3]">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Pinterest" className="hover:text-[#D9A5B3]">
              <i className="fab fa-pinterest-p"></i>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-[#D9A5B3]">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-200 mt-10 pt-6 text-center text-xs text-[#8B8B8B]">
        © {new Date().getFullYear()} Aadhya Signature Events. All rights reserved.
      </div>
    </footer>
  );
}

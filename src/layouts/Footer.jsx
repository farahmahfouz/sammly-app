import { Link } from "react-router-dom";

function Footer() {

  return (
    <footer className="bg-background text-center sm:text-start  text-textSecondary p-10 container mx-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1.5fr] gap-4">
        <div>
          <div className="flex justify-center sm:justify-start flex-col gap-4">
            <Link to="/" className="">
              <img src="/sammlyLogo.png" width={90} alt="logo" />
            </Link>
            <p className="text-textMuted text-sm max-w-[200px] first-letter:capitalize tracking-tighter">custom T-shirts for every story, every style, every occasion.</p>
          </div>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="bg-surfacePurple/90 text-textSecondary hover:text-gray-900 p-3 rounded-full flex items-center justify-center">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="bg-surfacePurple/90 text-textSecondary hover:text-gray-900 p-3 rounded-full flex items-center justify-center">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="bg-surfacePurple/90 text-textSecondary hover:text-gray-900 p-3 rounded-full flex items-center justify-center">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="#" className="bg-surfacePurple/90 text-textSecondary hover:text-gray-900 p-3 rounded-full flex items-center justify-center">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-md">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline text-sm text-textMuted">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-sm text-textMuted">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-sm text-textMuted">
                Create Your Own
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-sm text-textMuted">
                About Us
              </a>
            </li>
          </ul>
        </div>



        <div>
          <h3 className="font-bold text-md">Customer Service</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline text-sm text-textMuted">
                Help & FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-sm text-textMuted">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-sm text-textMuted">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-sm text-textMuted">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-4 md:mt-0">
          <h3 className="font-bold text-md text-center md:text-start">
            Join our newsletter
          </h3>
          <p className="text-textMuted text-sm mb-4 text-center md:text-start">
            Get 10% off your first order!
          </p>

          <form className="flex items-center bg-white rounded-full border border-gray-200  pl-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 outline-none bg-transparent text-sm placeholder-gray-400"
            />
            <button
              type="submit"
              className="btn rounded-full text-white text-xs px-6  border-none hover:opacity-90 transition"
              style={{
                background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-start py-6 border-t mt-6">
        <p className="text-sm tracking-tighter text-textMuted">
          &copy; 2024 Sammly. All rights reserved.
        </p>
       
      </div>
    </footer>
  );
}

export default Footer;

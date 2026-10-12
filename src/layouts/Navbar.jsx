import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

//contexts
import AuthContext from "../context/AuthContext";
import useCart from "../features/cart/useCart";
import UserContext from "../context/UserContext";

// Import the custom link component
import CustomLink from "./CustomLink";

//icons
import CartIcon from "../icons/CartIcon";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { userProfile, isLoading } = useContext(UserContext);
  const { totalQuantity } = useCart();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const closeDropdown = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
    closeDropdown();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 bg-base-100 w-full">
      <div className="navbar container mx-auto border-0 flex justify-between">
        <div >
          <Link to="/" className="hidden md:block">
            <img src="/sammlyLogo.png" width="160" height="40" alt="logo" />
          </Link>
        </div>

        {/* Burger Icon for Small Screens */}
        <div className="md:hidden text-primary hover:text-primaryDark absolute">
          <button onClick={toggleMenu} className="btn btn-ghost justify-start btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-base">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/products">Products</CustomLink>
          <CustomLink to="/customize">Make your own</CustomLink>
          {/* <CustomLink to="/aboutus">About Us</CustomLink> */}
          <CustomLink to="/contact">Contact Us</CustomLink>
        </div>

        {/* Mobile Navigation Links */}

        <div
          className={`absolute top-16 left-0 w-full bg-white shadow-lg p-3
            flex flex-col gap-1 md:hidden z-50
            transition-all duration-300 ease-in-out origin-top
            ${isMenuOpen
              ? "opacity-100 translate-y-0 scale-y-100 visible"
              : "opacity-0 -translate-y-3 scale-y-95 invisible pointer-events-none"
            }`}
        >
          <CustomLink
            to="/"
            className="block w-full px-4 py-3 rounded-lg text-primary hover:bg-purple-50 transition-colors duration-200"
          >
            Home
          </CustomLink>

          <CustomLink
            to="/products"
            className="block w-full px-4 py-3 rounded-lg text-primary hover:bg-purple-50 transition-colors duration-200"
          >
            Products
          </CustomLink>

          <CustomLink
            to="/customize"
            className="block w-full px-4 py-3 rounded-lg text-primary hover:bg-purple-50 transition-colors duration-200"
          >
            Customize
          </CustomLink>

          <CustomLink
            to="/contact"
            className="block w-full px-4 py-3 rounded-lg text-primary hover:bg-purple-50 transition-colors duration-200"
          >
            Contact Us
          </CustomLink>
        </div>


        <div className="flex gap-2 items-center">
          {isLoggedIn ? (
            <>
              {/* Cart */}
              <Link to="/cart" className="px-3">
                <div className="indicator">
                  <CartIcon />
                  {totalQuantity > 0 && (
                    <span className="badge badge-sm indicator-item">
                      {totalQuantity}
                    </span>
                  )}
                </div>
              </Link>

              {/* Avatar dropdown (only when logged in) */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="rounded-2xl">
                    <div className="avatar placeholder z-10 w-10">
                      <div className="bg-white text-primary border border-primary hover:text-primaryDark w-16 rounded-full">
                        <span className="text-xl">
                          {isLoading ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                          ) : userProfile ? (
                            userProfile.name.charAt(0).toUpperCase()
                          ) : (
                            <img src="/usernotfound.jpg" alt="User Not Found" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-52 p-2 shadow-cardShadow"
                >
                  <li>
                    <Link
                      onClick={closeDropdown}
                      to="/user-profile"
                      className="px-5 py-2.5 text-textPrimary text-md rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 active:!bg-gray-100 active:!text-textPrimary transition-colors"
                    >
                      <CgProfile />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="px-5 py-2.5 text-red-600 text-left rounded-md hover:bg-gray-50 focus:outline-none focus:bg-red-50 active:!bg-red-50 transition-colors"
                    >
                      <LuLogOut />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Login / Register buttons (only when logged out) */}
              <Link
                to="/login"
                className="btn btn-sm border bg-transparent border-primary text-primary hover:text-primaryDark rounded-full px-5"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="btn btn-sm bg-primary hover:bg-primaryDark text-white rounded-full px-5"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

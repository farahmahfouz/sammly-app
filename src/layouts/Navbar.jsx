import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

//contexts
import AuthContext from "../context/AuthContext";
import  useCart  from "../features/cart/useCart";
import UserContext from "../context/UserContext";

// Import the custom link component
import CustomLink from "./CustomLink";

//icons
import CartIcon from "../icons/CartIcon";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { userProfile, isLoading } = useContext(UserContext);
  const { totalQuantity } = useCart();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 bg-base-100 w-full">

      <div className="navbar container mx-auto border-0 flex justify-between">


        <div className="">
          <Link to="/" >
            <img src="/sammlyLogo.png" width={90} alt="logo" />
          </Link>
        </div>

        {/* Burger Icon for Small Screens */}
        <div className="md:hidden text-primary hover:text-primaryDark absolute left-24">
          <button onClick={toggleMenu} className="btn btn-ghost btn-circle">
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
          <CustomLink to="/aboutus" className>
            About Us
          </CustomLink>
        </div>

        {/* Mobile Navigation Links */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="absolute top-16 left-0 bg-white w-full shadow-lg p-3">
            <CustomLink to="/" className="block px-4 py-2 text-primary hover:text-primaryDark">
              Home
            </CustomLink>
            <CustomLink to="/products" className="block px-4 py-2 text-primary hover:text-primaryDark">
              Products
            </CustomLink>
            <CustomLink
              to="/customize"
              className="block px-4 py-2 text-primary hover:text-primaryDark"
            >
              Customize
            </CustomLink>
            <CustomLink to="/aboutus">About Us</CustomLink>
          </div>
        </div>

        <div className=" flex gap-2 items-center">
          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <Link
                to="/cart"
                tabIndex={0}
                role="button"
                className="px-3"
              >
                <div className="indicator">
                  <CartIcon />
                  {totalQuantity > 0 && (
                      <span className="badge badge-sm indicator-item ">
                        {totalQuantity}
                      </span>
                  )}
                </div>
              </Link>
            </div>
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className=" avatar"
            >
              <div className="rounded-2xl">
                <div
                  className={`avatar placeholder z-10 w-10`}
                >
                  <div className="bg-white text-primary border border-primary hover:text-primaryDark w-16 rounded-full">
                    <span className="text-xl">
                      {isLoading && isLoggedIn ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary hover:text-primaryDark"></div>
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
              className="menu menu-sm dropdown-content bg-slate-50 rounded-box z-10 mt-3 w-52 p-2 shadow-sm"
            >
              {isLoggedIn && (
                <li className="">
                  <Link
                    to="/user-profile"
                    className="px-5 py-1 text-textPrimary text-md  hover:transition-all"
                  >
                    Profile
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li className="">
                  <Link
                    to="/login"
                    className="px-5 py-1 text-textPrimary text-md  hover:transition-all"
                  >
                    Login
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li className="">
                  <Link
                    to="/sign-up"
                    className="px-5 py-1  text-textPrimary text-md  hover:transition-all"
                  >
                    Register
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="">
                  <button
                    onClick={handleLogout}
                    className="px-5 py-3 text-xl  text-red-600 rounded-lg hover:transition-all"
                  >
                    Logout{" "}

                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

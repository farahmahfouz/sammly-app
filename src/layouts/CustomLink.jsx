import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function CustomLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div className="relative group">
      <Link
        to={to}
        className={`font-medium tracking-tight text-base hover:transition-all ${
           isActive ? "text-primaryDark" : "text-textPrimary"
        }`}
      >
        {children}
      </Link>
      <div
        className={`bg-primaryDark  w-full h-[2px] rounded-xl transform transition-transform duration-500 ${
          isActive ? "scale-x-100" : "scale-x-0"
        }`}
      ></div>
    </div>
  );
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomLink;

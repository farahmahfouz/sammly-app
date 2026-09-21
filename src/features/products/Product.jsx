import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { useToggleFavorite } from "../../hooks/useToggleFavorite";

import HeardFilledIcon from "../../icons/HeardFilledIcon";
import HeartIcon from "../../icons/HeartIcon";

import AuthContext from "../../context/AuthContext";
import Cart from "../../icons/Cart";

function Product({ product }) {
    const { isLoggedIn } = useContext(AuthContext);

    const {
        favoriteProducts,
        toggleFavorite,
    } = useToggleFavorite();

    return (
        <Link to={`/product-details/${product._id}`} className="rounded-xl w-full max-w-64 border border-borderLight shadow-cardShadow">

            {/* Product Image */}
            <figure className="relative">

                {isLoggedIn && (
                    <button
                        type="button"
                        className="bg-white rounded-3xl w-11 h-11 absolute top-9 start-4 flex justify-center items-center cursor-pointer z-10"
                        onClick={() => toggleFavorite(product._id)}
                    >
                        {favoriteProducts?.[product._id] ? (
                            <HeardFilledIcon />
                        ) : (
                            <HeartIcon />
                        )}
                    </button>
                )}

                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-lg p-2 w-full h-60 object-cover"
                />
            </figure>

            {/* Product Info */}
            <div className="p-4 pt-0 items-center gap-1 text-start">

                <h2 className="text-sm font-bold text-textPrimary  uppercase truncate">
                    {product.name}
                </h2>
                <p className="text-textMuted text-sm tracking-tighter py-2 text-start  text-nowrap truncate">
                    {product.description}
                </p>
                <div className="flex justify-between gap-3 pb-2">

                    <p className="text-base font-bold text-primary whitespace-nowrap">
                        EG {product.price}
                    </p>
                    <p className="text-textMuted text-sm tracking-tighter">(124)</p>
                </div>


                {/* Details Button */}
                {isLoggedIn &&
                    <button
                        className="py-2 px-4 w-full rounded-full text-primary bg-surfaceLavender transition duration-700 hover:bg-opacity-80 text-sm font-semibold flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <Cart />
                            <span className="border-l border-surfacePurple h-5"></span>
                        </div>
                        <span className="mx-auto">Add To Cart</span>
                    </button>
                }

            </div>
        </Link>
    );
}

export default Product;

Product.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};
import { useContext } from "react";
import { Link } from "react-router-dom";

import useFavoriteProducts from "../products/useFavoriteProducts";

import HeardFilledIcon from "../../icons/HeardFilledIcon";
import HeartIcon from "../../icons/HeartIcon";

import AuthContext from "../../context/AuthContext";
import Cart from "../../icons/Cart";
import RatingStars from "../reviews/RatingStarts";

function Product({ product }) {
    const { isLoggedIn } = useContext(AuthContext);

    const { favoriteProducts, toggleFavorite } = useFavoriteProducts();

    return (
        <Link
            to={`/product-details/${product._id}`}
            className="flex flex-col h-full rounded-xl overflow-hidden relative w-full min-w-0 md:min-w-56 md:max-w-[351px] border border-borderLight shadow-cardShadow"
        >
            {product.isOnSale && (
                <span className="absolute top-4 -left-10 w-32 -rotate-45 z-10 bg-surfaceLavender text-primaryDark text-xs font-bold text-center py-1">
                    -{product.discount}%
                </span>
            )}

            <figure className="relative">
                {isLoggedIn && (
                    <button
                        type="button"
                        className="bg-white rounded-3xl w-7 h-7 absolute top-3 right-3 md:top-4 md:right-4 flex justify-center items-center cursor-pointer z-10"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(product._id);
                        }}
                    >
                        {favoriteProducts?.some(
                            (favProduct) => favProduct._id === product._id
                        ) ? (
                            <HeardFilledIcon />
                        ) : (
                            <HeartIcon />
                        )}
                    </button>
                )}

                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-lg p-2 w-full h-44 md:h-60 object-cover"
                />
            </figure>

            {/* Product Info */}
            <div className="p-2 md:p-4 pt-0 text-start flex flex-col flex-1">
                <h2 className="text-xs md:text-sm font-bold text-textPrimary uppercase truncate">
                    {product.name}
                </h2>
                <p className="text-textMuted text-xs md:text-sm tracking-tighter py-1 md:py-2 text-start lowercase first-letter:uppercase truncate">
                    {product.description}
                </p>

                <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-3 pb-2">
                    <div className="flex flex-wrap gap-x-1 items-center">
                        {product.isOnSale ? (
                            <>
                                <p className="text-sm md:text-base font-bold text-primary line-through whitespace-nowrap">
                                    EG {product.price}
                                </p>
                                <p className="text-xs md:text-sm text-textMuted whitespace-nowrap">
                                    EG {product.finalPrice}
                                </p>
                            </>
                        ) : (
                            <p className="text-sm md:text-base font-bold text-primary whitespace-nowrap">
                                EG {product.price}
                            </p>
                        )}
                    </div>

                    <div className="text-textMuted/70 text-xs tracking-tighter flex items-center gap-1 md:gap-2">
                        <RatingStars size="h-2 w-2" value={product.ratingsAverage} />
                        {product.ratingsQuantity > 0 && (
                            <span>({product.ratingsQuantity})</span>
                        )}
                    </div>
                </div>

                {/* Add To Cart Button */}
                {isLoggedIn && (
                    <button
                        type="button"
                        className="py-1.5 md:py-2 mt-auto px-2 md:px-4 w-full rounded-full text-primary bg-surfaceLavender transition duration-700 hover:bg-opacity-80 text-xs md:text-sm font-semibold flex items-center justify-between"
                    >
                        <div className="flex items-center gap-1 md:gap-2">
                            <Cart />
                            <span className="border-l border-surfacePurple h-5"></span>
                        </div>
                        <span className="mx-auto">Add To Cart</span>
                    </button>
                )}
            </div>
        </Link>
    );
}

export default Product;

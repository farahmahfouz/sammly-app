import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ArrowLeft from "../../icons/ArrowLeft";
import HeartIcon from "../../icons/HeartIcon";
import HeardFilledIcon from "../../icons/HeardFilledIcon";
import NoData from "../../components/NoData";
import Rating from "../../components/Rating";
import AuthContext from "../../context/AuthContext";
import useFavoriteProducts from "../products/useFavoriteProducts";
import useProduct from "./useProduct";
import ProductFeatures from "./ProductFeatures";
import ProductSize from "./ProductSize";
import { TbShoppingBagExclamation } from "react-icons/tb";


function ProductDetailsCard({ onSizeChartClick }) {
    const { product, isLoading, isError } = useProduct();

    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { favoriteProducts, toggleFavorite } = useFavoriteProducts();

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    if (isLoading) {
        return (
            <div className="h-screen text-hoverButton flex justify-center align-middle">
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        );
    }

    if (isError || !product) {
        return <NoData />;
    }

    const allImages = [product.image, ...(product.extraImages || [])];

    const navigateToLogin = () => {
        navigate(`/login?redirect=product-details/${product._id}`);
    };

    const stockAvailable = new Set(
        product?.stock?.map((el) => {
            if (el.quantity > 0) {
                return el.size;
            }
        })
    );

    const addToCartHandler = async (productId) => {
        if (!selectedSize) {
            toast.warn("Please choose your size");
            return;
        }
        const cartItem = {
            productId,
            quantity: 1,
            size: selectedSize,
            type: "Product",
        };
        try {
            setIsAdding(true);
            const response = await addToCart(cartItem);
            if (response.status === "Not-Modified") {
                toast.warn(response.message);
            } else if (response.status === "success") {
                toast.success("Item added to cart successfully");
            }
            setIsAdding(false);
        } catch (error) {
            setIsAdding(false);
            toast.error(`${error.message}`);
        }
    };

    return (
        <div className=" flex flex-col lg:flex-row md:gap-11">
            <div className="flex gap-4 w-full lg:w-1/2">
                <div className="hidden md:flex flex-col gap-3 w-20 ">
                    {allImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`rounded-xl overflow-hidden border-2 transition-colors ${index === activeIndex
                                ? "border-primary"
                                : "border-transparent"
                                }`}
                        >
                            <img
                                src={img}
                                alt={`${product.name} - ${index + 1}`}
                                className="w-full h-20 object-cover shadow-cardShadow"
                            />
                        </button>
                    ))}
                </div>

                <div className="relative flex-1 h-[510px]">
                    <button
                        onClick={() => window.history.back()}
                        className="bg-white p-2 top-3 start-3 absolute rounded-3xl z-10"
                    >
                        <ArrowLeft className="rotate-80 size-5 text-primary" />
                    </button>

                    <img
                        src={allImages[activeIndex]}
                        alt={product.name}
                        className="w-full h-full rounded-xl object-cover shadow-cardShadow"
                    />

                    <div className="absolute bottom-3 end-3 bg-white/90 px-3 py-1 rounded-full text-sm text-primary">
                        {activeIndex + 1} / {allImages.length}
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 py-5">
                <div className="flex justify-between">
                    <h1 className="text-xl md:text-2xl font-bold uppercase">
                        {product.name}
                    </h1>
                    {isLoggedIn && (
                        <div
                            className="bg-borderLight/40 rounded-full w-12 h-12 flex justify-center items-center cursor-pointer"
                            onClick={() => toggleFavorite(product._id)}
                        >
                            {favoriteProducts && favoriteProducts[product._id] ? (
                                <HeardFilledIcon />
                            ) : (
                                <HeartIcon />
                            )}
                        </div>
                    )}
                </div>
                <span className="text-textMuted flex gap-2 text-sm items-center">
                    <Rating />
                    4.8 (124 reviews)
                </span>
                <p className="text-primaryDark text-2xl font-bold pt-4 ">
                    EG {product.price}
                </p>
                <p className="py-4 pb-10 text-textMuted text-sm lowercase  first-letter:uppercase">{product.description}</p>
                <ProductFeatures />
                <div className="md:pt-5">
                    <ProductSize onSizeChartClick={onSizeChartClick} setSelectedSize={setSelectedSize} stockAvailable={stockAvailable} />

                    <div className="flex justify-center lg:flex lg:justify-end md:pt-10">
                        {isLoggedIn ? (
                            <div className="grid grid-cols-[1.5fr_4fr] gap-10 w-full">
                                <div className="flex items-center justify-between gap-4 border border-surfaceLavender shadow-cardShadow rounded-full px-5 py-2 ">
                                    <button
                                        // onClick={decreaseQty}
                                        className="text-primary text-lg font-medium hover:opacity-70 transition"
                                    >
                                        −
                                    </button>
                                    <span className="text-sm font-medium text-textPrimary">1</span>
                                    <button
                                        // onClick={increaseQty}
                                        className="text-primary text-lg font-medium hover:opacity-70 transition"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => addToCartHandler(product._id)}
                                    className="bg-primary hover:bg-primaryDark text-sm transition duration-700 shadow-cardShadow rounded-full w-full text-white py-2 flex items-center justify-center gap-2"
                                    disabled={isAdding}
                                >
                                    {isAdding ? (
                                        <span className="loading loading-ring loading-md"></span>
                                    ) : (
                                        <>
                                            <TbShoppingBagExclamation className="text-lg" />
                                            <span>ADD TO CART</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={navigateToLogin}
                                className="bg-red-500 hover:bg-red-600 transition duration-700 ease-in-out rounded w-full text-white py-2 px-14"
                            >
                                Login to Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsCard;
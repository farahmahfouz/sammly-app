import useCart from "./useCart";
import XIcon from "../../icons/XIcon";

function CartCard({ product, handleDeleteConfirm }) {
    const {
        isRemoving,
        updatingQuantity,
        handleQuantityChange,
        getAvailableStock,
    } = useCart();

    const availableStock = getAvailableStock(product);
    const isMinQuantity = product.quantity <= 1;
    const isMaxQuantity = product.quantity >= availableStock;
    const isUpdating = updatingQuantity === product._id;

    return (
        <div
            key={product?._id}
            className="relative bg-white shadow-cardShadow rounded-lg py-3 px-4 my-5"
        >
            <div className="flex items-start gap-4">
                {/* Product Image */}
                <img
                    className="w-24 h-24 rounded-md object-cover flex-shrink-0"
                    src={
                        product?.type === "Product"
                            ? product?.product?.image
                            : product?.design?.image[0]
                    }
                    alt={product?.product?.name}
                />

                {/* Details */}
                <div className="flex-grow min-w-0">
                    <h2 className="font-bold text-base md:text-lg tracking-tighter truncate">
                        {product?.product?.name}
                    </h2>
                    <p className="text-gray-400 text-sm mt-0.5">
                        Size: {product?.size}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                        <p className="text-lg font-bold text-black">
                            {product?.type === "Product"
                                ? product?.product?.price * product?.quantity
                                : product?.design?.totalPrice * product?.quantity}
                            <span className="text-gray-400 text-sm font-normal ms-1">EG</span>
                        </p>

                        <div className="flex items-center border border-gray-200 rounded-md">
                            <button
                                onClick={() =>
                                    handleQuantityChange(
                                        product?._id,
                                        product?.quantity - 1
                                    )
                                }
                                className={`w-8 h-8 flex items-center justify-center text-buttonColor text-lg transition duration-300 ease-in-out ${isMinQuantity || isUpdating
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-100 cursor-pointer"
                                    }`}
                                disabled={isMinQuantity || isUpdating}
                            >
                                -
                            </button>
                            <span className="w-6 text-center text-sm">
                                {isUpdating ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    product?.quantity
                                )}
                            </span>
                            <button
                                onClick={() =>
                                    handleQuantityChange(
                                        product?._id,
                                        product?.quantity + 1
                                    )
                                }
                                className={`w-8 h-8 flex items-center justify-center text-buttonColor text-lg transition duration-300 ease-in-out ${isMaxQuantity || isUpdating
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-100 cursor-pointer"
                                    }`}
                                disabled={isMaxQuantity || isUpdating}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Delete button */}
                <button
                    onClick={() => handleDeleteConfirm(product?._id)}
                    className="absolute top-2 right-2 text-black rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
                    disabled={isRemoving === product?._id}
                >
                    {isRemoving === product?._id ? (
                        <span className="loading loading-ring loading-md"></span>
                    ) : (
                        <XIcon />
                    )}
                </button>
            </div>
        </div>
    );
}

export default CartCard;
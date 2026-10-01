import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../utils/api/orderApi";
import useCart from "./useCart";
import { toast } from "react-hot-toast";

import { GiChewedHeart } from "react-icons/gi";
import { MdLockReset } from "react-icons/md";

import CartCard from "./CartCard";
import OrderCard from "./OrderCard";
import EmptyCart from "./EmptyCart";
import ConfirmModal from "../../components/ConfirmModal";

function Cart() {
    const {
        cart,
        loading,
        isClearing,
        handleRemoveFromCart,
        handleClearCart,
        fetchCart,
    } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showClearCartModal, setShowClearCartModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [iframeSrc, setIframeSrc] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(null);
    const navigate = useNavigate();

    const changePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    };

    const checkout = async () => {
        if (paymentMethod === "Online") {
            await Onlinecheckout();
        } else if (paymentMethod === "COD") {
            // Assuming COD function is defined elsewhere in the file
            await CODcheckout();
        }
    };
    const CODcheckout = async () => {
        await createOrder(paymentMethod);
        navigate("/");
        fetchCart();
        toast.success("Your order done successfully , orders are being delivered");
    };

    const Onlinecheckout = async () => {
        try {
            const order = await createOrder(paymentMethod);
            const hash = order.data.kashierOrderHash;
            const orderId = order.data.order._id;
            const totalPrice = order.data.order.totalPrice;

            const src = `https://checkout.kashier.io/?merchantId=MID-28559-7&orderId=${orderId}&amount=${totalPrice}&currency=EGP&hash=${hash}&mode=test&metaData={"metaData":"myData"}&merchantRedirect=http://localhost:5173/success-payment&allowedMethods=card,wallet&failureRedirect=false&redirectMethod=get&brandColor=%2381B3DC&display=en&serverWebhook=https://react-node-designer.glitch.me/api/v1/orders/kashier`;

            setIframeSrc(src);
            setIsOpen(true);
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (e) => {
        if (e.target.id === "modal-overlay") {
            handleCloseModal();
        }
    };

    const handleDeleteConfirm = (id) => {
        setItemToDelete(id);
        setShowModal(true);
    };

    const handleDeleteCancel = () => {
        setItemToDelete(null);
        setShowModal(false);
    };

    const handleDeleteConfirmed = () => {
        if (itemToDelete) {
            handleRemoveFromCart(itemToDelete);
        }
        setItemToDelete(null);
        setShowModal(false);
    };

    const handleClearCartConfirm = () => {
        setShowClearCartModal(true);
    };

    const handleClearCartCancel = () => {
        setShowClearCartModal(false);
    };

    const handleClearCartConfirmed = async () => {
        try {
            await handleClearCart();
        } finally {
            setShowClearCartModal(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            {isOpen && (
                <div
                    id="modal-overlay"
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleClickOutside}
                >
                    <div className="relative min-w-96 max-w-3xl h-full max-h-[90%] bg-white rounded-lg shadow-lg overflow-hidden">
                        <button
                            className="absolute top-2 right-2 bg-gray-100 text-black rounded-full p-2"
                            onClick={handleCloseModal}
                        >
                            ✕
                        </button>
                        <iframe
                            src={iframeSrc}
                            className="w-full h-full"
                            style={{ border: "none", overflow: "hidden" }}
                        />
                    </div>
                </div>
            )}
            {!cart || cart.length === 0 ? (
                <EmptyCart></EmptyCart>
            ) : (
                <div className="my-5">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-5 mt-5">
                        <div className="col-span-2">
                            <div className="flex justify-between">
                                <div className="tracking-tight">
                                    <p className="text-base text-textSecondary">Your Cart</p>
                                    <h1 className="font-extrabold text-2xl text-textPrimary">
                                        Shopping Cart
                                    </h1>
                                    <p className="text-textSecondary tracking-tighter flex gap-1 items-center">good things are just a click way
                                        <span className="text-lg text-primary">
                                            <GiChewedHeart />
                                        </span>
                                    </p>
                                </div>
                                <button
                                    onClick={handleClearCartConfirm}
                                    className="text-primary hover:text-primaryDark text-sm flex gap-1 items-center transition duration-300 ease-in-out"
                                    disabled={isClearing}
                                >
                                    <MdLockReset />
                                    {isClearing ? (
                                        <span className="loading loading-ring loading-md"></span>
                                    ) : (
                                        "Reset"
                                    )}
                                </button>
                            </div>
                            {cart.map((product) => {
                                return (
                                    <CartCard key={product._id} product={product} handleDeleteConfirm={handleDeleteConfirm} />
                                );
                            })}
                        </div>

                        {/* Summary Section */}
                        <OrderCard
                            paymentMethod={paymentMethod}
                            changePaymentMethod={changePaymentMethod}
                            checkout={checkout}
                        />
                    </div>
                </div>
            )}
            {/* Delete design */}
            <ConfirmModal
                isOpen={showModal}
                title="Confirm Delete"
                message="Are you sure you want to delete this design?"
                confirmText="Delete"
                variant="danger"
                onConfirm={handleDeleteConfirmed}
                onCancel={handleDeleteCancel}
            />

            {/* Clear cart */}
            <ConfirmModal
                isOpen={showClearCartModal}
                title="Clear Cart"
                message="Are you sure you want to clear the entire cart?"
                confirmText="Clear Cart"
                variant="danger"
                onConfirm={handleClearCartConfirmed}
                onCancel={handleClearCartCancel}
            />
        </div>
    );
}

export default Cart
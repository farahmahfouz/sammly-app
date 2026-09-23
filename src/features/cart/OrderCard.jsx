import { useCart } from "../../context/CartContext";
import { LiaFileSignatureSolid } from "react-icons/lia";


function OrderCard({ paymentMethod, changePaymentMethod, checkout }) {
    const {
        totalQuantity,
        totalPrice,

    } = useCart();
    return (
        <div className="col-span-1 border border-surfaceGray shadow-cardShadow p-5 rounded-lg h-fit">
            <h2 className="font-bold text-xl text-textPrimary flex gap-2 items-center pb-4">
                <span className="text-4xl text-primaryDark">
                    <LiaFileSignatureSolid />
                </span>

                Order Summary
            </h2>
            <span className="block w-full border-t border-borderLight" />

            <div className="mt-5">
                <div className="flex justify-between tracking-tighter">
                    <span className="font-bold">Total Quantity</span>
                    <span>{totalQuantity}</span>
                </div>
                <div className="flex justify-between my-4">
                    <span className="font-bold">Total Price</span>
                    <span>{totalPrice} EG</span>
                </div>

                <span className="block w-full border-t border-borderLight" />

                <div className="flex justify-between my-6">
                    <div>
                        <label className="font-bold">Payment Method</label>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[12px] items-end font-medium">
                        {["Online", "COD"].map((method) => (
                            <label className="flex items-center gap-1" key={method}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method}
                                    className="radio"
                                    onChange={changePaymentMethod}
                                />
                                {method}
                            </label>
                        ))}
                    </div>
                    {/* </div> */}
                </div>
                <button
                    className="transition duration-300 ease-in-out rounded-full text-white px-14 py-2 mt-4 w-full"
                    onClick={checkout}
                    disabled={!paymentMethod}
                    style={{
                        background: paymentMethod
                            ? "linear-gradient(to right, #81B3DC, #CE6ADA)"
                            : "linear-gradient(to right, rgba(129, 179, 220, 0.5), rgba(206, 106, 218, 0.5))",
                    }}
                >
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default OrderCard
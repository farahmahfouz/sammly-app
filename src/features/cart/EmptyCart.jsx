import { Link } from "react-router-dom";
import ArrowRight from './../../icons/ArrowRight';

export default function EmptyCart() {
    return (
        <div className='flex justify-center items-start py-12 text-center '>
            <div className="flex flex-col items-center gap-3">
                <div className="flex justify-center">
                    <img src="/empty-cart.png" alt="" className='rounded-xl w-1/2' />
                </div>
                <p className="text-3xl font-semibold text-textPrimary first-letter:uppercase">your cart is empty</p>
                <p className="text-textSecondary tracking-tight max-w-96">Looks like you haven&apos;t added anything to your cart yet.
                    Explore our products and find something you&apos;ll love!</p>
                <Link to="/products" className="btn mt-3 bg-primaryGradient rounded-full font-normal capitalize shadow-cardShadow text-white">continue shopping
                    <ArrowRight />
                </Link>
            </div>
        </div>
    )
}

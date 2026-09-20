import { Link } from "react-router-dom"
import ArrowRight from "../../icons/ArrowRight"
import Rating from "../Rating";
const testimonials = [
    {
        image: "usernotfound.jpg",
        name: "Sarah M.",
        review: "The quality is amazing and the print looks exactly like my design, I'm so happy with my order!",
        location: "Cairo, Egypt",
        rating: 2
    },
    {
        image: "usernotfound.jpg",
        name: "Ahmed K.",
        review: "Super easy to use and the delivery was faster than I expected. Will definitely order again!",
        location: "Alexandria, Egypt",
        rating: 5
    },
    {
        image: "usernotfound.jpg",
        name: "Nour A.",
        review: "I created a group shirt for my friends and it turned out perfect. Great quality and service!",
        location: "Giza, Egypt",
        rating: 3
    }
];

function Review() {
    return (
        <div className="container mx-auto py-16">
            <span className="flex gap-1 text-primary items-center">
                <h2 className="text-xs font-semibold uppercase tracking-tighter">what our customer say</h2>
            </span>
            <div className="flex justify-between">
                <p className="capitalize text-3xl font-extrabold text-textPrimary">real people. real stories.</p>
                <Link to="/products" className="flex gap-2 items-center capitalize text-sm font-medium tracking-tight text-primary hover:text-primaryDark">
                    view all reviews <ArrowRight />
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6">

                {testimonials.map(test => (
                    <div key={test.name} className="border border-borderLight rounded-lg p-4 flex gap-4">
                        <img src={test.image} alt={test.name} className="h-12 w-12 object-cover rounded-full" />
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-textSecondary tracking-tight leading-6">&quot;{test.review}&quot;</p>
                            <Rating rating={test.rating} />
                            <span>
                                <p className="text-textPrimary font-semibold">{test.name}</p>
                                <p className="text-textSecondary tracking-tighter text-sm">{test.location}</p>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Review
import { useState } from "react";
import Rating from "../../components/Rating";
import useCreateReview from "./useCreateReview";

function ReviewForm() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const { addReview, isPending } = useCreateReview();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating === 0) return;

        addReview(
            { rating, review },
            {
                onSuccess: () => {
                    setRating(0);
                    setReview("");
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <h3 className="text-2xl font-bold capitalize text-textPrimary">
                write your review
            </h3>

            <p className="mt-2 text-base text-textMuted first-letter:capitalize">
                share your experience with this product
            </p>

            <p className="mt-4 text-base font-semibold text-textPrimary">
                Your Rating
            </p>

            <div className="mt-2">
                <Rating value={rating} onChange={setRating} />
            </div>

            <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell others what you liked..."
                className="mt-4 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-textPrimary placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <div className="mt-2 flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-full bg-primary px-8 py-3 text-sm font-semibold tracking-tight text-white shadow-cardShadow transition-all hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending ? "Submitting..." : "Submit Review"}
                </button>
            </div>
        </form>
    );
}

export default ReviewForm;
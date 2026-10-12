import { useEffect, useRef, useState } from "react";
import Rating from "../../components/Rating";
import useCreateReview from "./useCreateReview";
import useUpdateReview from './useUpdateReview';

function ReviewForm({ editingReview, onCancelEdit }) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const textareaRef = useRef(null);

    const { addReview, isPending: isCreating } = useCreateReview();
    const { editReview, isPending: isUpdating } = useUpdateReview();

    const isEditing = Boolean(editingReview);
    const isPending = isCreating || isUpdating;

    useEffect(() => {
        if (!editingReview) return;
        setRating(editingReview.rating);
        setReview(editingReview.review);

        const t = setTimeout(() => textareaRef.current?.focus({ preventScroll: true }), 400);
        return () => clearTimeout(t);
    }, [editingReview]);

    const resetForm = () => {
        setRating(0);
        setReview("");
    };

    const handleCancel = () => {
        resetForm();
        onCancelEdit?.();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating === 0) return;

        if (isEditing) {
            editReview(
                { reviewId: editingReview._id, data: { rating, review } },
                {
                    onSuccess: () => {
                        resetForm();
                        onCancelEdit?.();
                    },
                }
            );
            return;
        }

        addReview({ rating, review }, { onSuccess: resetForm });
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
                ref={textareaRef}
                id="message"
                name="message"
                rows={5}
                required
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell others what you liked..."
                className="mt-4 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-textPrimary placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <div className="mt-2 flex justify-end gap-2">
                {isEditing && (
                    <button type="button"
                        onClick={handleCancel}
                        className="rounded-full border border-borderLight px-8 py-3 text-sm font-semibold text-textPrimary hover:bg-gray-50">
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-full bg-primary px-8 py-3 text-sm font-semibold tracking-tight text-white shadow-cardShadow transition-all hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-60"
                >
                     {isPending ? "Saving..." : isEditing ? "Update Review" : "Submit Review"}
                </button>
            </div>
        </form>
    );
}

export default ReviewForm;
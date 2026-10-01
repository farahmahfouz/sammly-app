import { useState } from "react";
import RatingStars from "./RatingStarts";
import useProductReview from "./useProductReview";

const PAGE_SIZE = 5;

function ReviewsList() {
  const { reviews, isLoading } = useProductReview();
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (isLoading) return null;
  if (!reviews?.length) return null;

  return (
    <section className="w-full">
      <span className="flex flex-col gap-1 pb-4 text-primary">
        <h2 className="text-xs font-semibold uppercase tracking-tighter">
          what our customer say
        </h2>
        <p className="text-lg md:text-3xl font-extrabold capitalize text-textPrimary">
          real people. real stories.
        </p>
      </span>

      <div className="flex flex-col gap-3">
        {reviews.slice(0, visible).map((review) => (
          <div
            key={review._id}
            className="flex gap-4 rounded-lg border border-borderLight p-4"
          >
            <img
              src={review.user?.image || "/usernotfound.jpg"}
              alt={review.user?.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm leading-6 tracking-tight text-textSecondary">
                &quot;{review.review}&quot;
              </p>
              <RatingStars value={review.rating} />
              <span>
                <p className="font-semibold text-textPrimary">{review.user?.name}</p>
                <p className="text-sm tracking-tighter text-textSecondary">
                  {review.user?.address}
                </p>
              </span>
            </div>
          </div>
        ))}
      </div>

      {visible < reviews.length && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="mt-4 w-full rounded-full border border-borderLight py-2 text-sm font-semibold text-textPrimary hover:bg-gray-50"
        >
          Show more ({reviews.length - visible} left)
        </button>
      )}
    </section>
  );
}

export default ReviewsList;
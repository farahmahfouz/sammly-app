import useProductReview from "./useProductReview";
import useProduct from "../productDetails/useProduct";
import RatingStars from "./RatingStarts";

function ReviewSummary() {
  const { product, isLoading } = useProduct();
  const { reviews } = useProductReview();

  const total = reviews.length;

  const ratingData = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return {
      star,
      count,
      width: total ? `${(count / total) * 100}%` : "0%",
    };
  });

  if (isLoading) return null;
  if (!reviews?.length) return null;

  return (
    <section className="rounded-3xl border border-borderLight px-8 py-4 shadow-cardShadow">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Left */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-textPrimary">Customer Reviews</h2>

          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-bold leading-none text-primaryDark">
              {product.ratingsAverage.toFixed(1)}
            </h1>

            <div>
              <RatingStars value={Math.round(product.ratingsAverage)} size="h-6 w-6" />
              <p className="mt-2 text-textMuted">
                Based on {product.ratingsQuantity}{" "}
                {product.ratingsQuantity === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col justify-center gap-2">
          {ratingData.map((item) => (
            <div key={item.star} className="flex items-center gap-3">
              <span className="w-8 font-medium text-textSecondary">{item.star}★</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-surfaceLavender">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: item.width }}
                />
              </div>
              <span className="w-6 text-sm text-textMuted">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewSummary;
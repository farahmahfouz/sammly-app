export default function RatingStars({ value, size = "h-4 w-4" }) {
  return (
    <div className="flex gap-1" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`mask mask-star-2 ${size} ${
            star <= value ? "bg-amber-400" : "bg-amber-200"
          }`}
        />
      ))}
    </div>
  );
}
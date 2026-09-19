// eslint-disable-next-line react/prop-types
export default function Rating({ rating }) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <input
          key={star}
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-amber-400 w-3 h-3"
          checked={star === rating}
          readOnly
        />
      ))}
    </div>
  );
}

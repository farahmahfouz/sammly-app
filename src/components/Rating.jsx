export default function Rating({ value, onChange }) {
  return (
    <div className="rating gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <input
          key={star}
          type="radio"
          name="rating"
          aria-label={`${star} star`}
          className={`mask mask-star-2 w-4 h-4 cursor-pointer transition-colors ${
            star <= value ? "bg-amber-400" : "bg-amber-200"
          }`}
          checked={star === value}
          onChange={() => onChange(star)}
        />
      ))}
    </div>
  );
}

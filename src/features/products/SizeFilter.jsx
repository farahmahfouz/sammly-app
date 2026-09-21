function SizeFilter({ selectedSize, onSizeChange }) {
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="py-4">
      <p className="text-textPrimary font-semibold capitalize text-sm">
        size
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {sizes.map((size) => (
          <label
            key={size}
            className="cursor-pointer"
          >
            <input
              type="checkbox"
              value={size}
              checked={selectedSize === size}
              onChange={() => onSizeChange(size)}
              className="sr-only"
            />

            <span
              className={`block border bg-surfaceLavender rounded px-4 py-2 text-sm transition-all ${
                selectedSize === size
                  ? "bg-primary text-white border-primaryDark"
                  : "border-borderLight text-textPrimary"
              }`}
            >
              {size}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SizeFilter;
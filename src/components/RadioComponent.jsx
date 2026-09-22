export default function RadioComponent({ setSize, stock }) {
  const handleSizeChange = (e) => {
    setSize(e.target.value); // Update the size in the parent component
  };

  return (
    <div className="flex flex-col gap-2 items-start sm:items-center">
      <div className="self-start">
        <label className="font-bold tracking-tighter">Size</label>
      </div>
      <div className="flex flex-wrap gap-2 text-[12px] font-medium">
        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
          <label className="flex items-center gap-1 relative" key={size}>
            <input
              type="radio"
              name="size"
              value={size}
              onChange={handleSizeChange}
              disabled={!stock.has(size)}
              className="peer sr-only"
            />
            <span
              className={`
        flex items-center justify-center
        w-14 h-10 rounded-full border
        font-semibold text-sm cursor-pointer
        transition-colors duration-150
        select-none

        ${!stock.has(size)
                  ? "border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed"
                  : "border-gray-200 text-gray-700 bg-white hover:border-indigo-300"}

        peer-checked:bg-primary
        peer-checked:border-primary
        peer-checked:text-white
      `}
            >
              {size}
            </span>

          </label>
        ))}
      </div>
    </div>
  );
}

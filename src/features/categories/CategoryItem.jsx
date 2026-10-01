function CategoryItem({ category, isChecked, onChange }) {
  return (
    <>
      {/* ===== Mobile: pill button ===== */}
      <li className="md:hidden">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            className="sr-only"
          />
          <span
            className={`flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium capitalize transition-all ${
              isChecked
                ? "bg-primaryDark text-white"
                : "bg-surfaceLavender text-textPrimary"
            }`}
          >
            {isChecked && <span className="text-xs leading-none">✓</span>}
            {category.name}
          </span>
        </label>
      </li>

      {/* ===== Desktop: checkbox + count ===== */}
      <li className="hidden md:flex justify-between">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-textPrimary capitalize">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            className="sr-only"
          />

          <span className="w-4 h-4 flex items-center justify-center rounded border bg-surfaceLavender border-border transition-all">
            {isChecked && (
              <span className="text-primaryDark text-xs leading-none">✓</span>
            )}
          </span>

          {category.name}
        </label>

        <p className="bg-surfaceLavender rounded-xs font-semibold text-primaryDark text-xs py-1 px-2">
          {category.productsCount}
        </p>
      </li>
    </>
  );
}

export default CategoryItem;
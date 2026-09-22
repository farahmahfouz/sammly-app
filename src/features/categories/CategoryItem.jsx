function CategoryItem({ category, isChecked, onChange }) {
  return (
    <li className="flex justify-between">
      <label className="flex items-center gap-2 cursor-pointer text-sm text-textPrimary capitalize">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="sr-only"
        />

        <span
          className={`w-4 h-4 flex items-center justify-center rounded border transition-all ${
            isChecked
              ? "bg-surfaceLavender border-border"
              : "bg-surfaceLavender border-border"
          }`}
        >
          {isChecked && (
            <span className="text-primaryDark text-xs leading-none">
              ✓
            </span>
          )}
        </span>

        {category.name}
      </label>

      <p className="bg-surfaceLavender rounded-xs font-semibold text-primaryDark text-xs py-1 px-2">
        {category.productsCount}
      </p>
    </li>
  );
}

export default CategoryItem;
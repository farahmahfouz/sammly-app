function PriceItem({ label, checked, onChange }) {
  return (
    <li>
      <label className="flex items-center gap-2 cursor-pointer text-sm text-textPrimary">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />

        <span
          className={`w-4 h-4 flex items-center justify-center rounded border transition-all ${
            checked
              ? "bg-surfaceLavender border-border"
              : "bg-surfaceLavender border-border"
          }`}
        >
          {checked && (
            <span className="text-primaryDark text-xs leading-none">
              ✓
            </span>
          )}
        </span>

        {label}
      </label>
    </li>
  );
}

export default PriceItem;
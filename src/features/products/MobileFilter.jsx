import { useEffect, useState } from "react";
import useProducts from "./useProducts";
import CategoryFilter from "../categories/CategoryFilter";

const SIZES = ["S", "M", "L", "XL", "XXL"];
const PRICES = [
  { label: "Under 500", min: null, max: 500 },
  { label: "500 - 1000", min: 500, max: 1000 },
  { label: "1000 - 1500", min: 1000, max: 1500 },
  { label: "Above 1500", min: 1500, max: null },
];

const chip = (active) =>
  `px-4 py-2 rounded-full text-sm transition-all ${
    active ? "bg-primary text-white" : "bg-gray-100 text-textPrimary"
  }`;

export default function MobileFilter({ isOpen, onClose }) {
  const {
    categories,
    selectedCategory,
    selectedSize,
    minPrice,
    maxPrice,
    handleCategoryChange,
    handleSizeChange,
    handlePriceChange,
    handleClearFilters,
  } = useProducts();

  const [shouldRender, setShouldRender] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
      return () => cancelAnimationFrame(id);
    } else {
      setVisible(false);
      const t = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-5 pt-3 pb-6 max-h-[90vh] overflow-y-auto transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-textPrimary">Filter</h3>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-gray-100 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Categories */}
        <section className="pb-4 border-b border-borderLight">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </section>

        {/* Size */}
        <section className="py-4 border-b border-borderLight">
          <h4 className="font-semibold text-sm mb-3">Size</h4>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSizeChange(s)}
                className={`${chip(selectedSize === s)} min-w-14`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Price */}
        <section className="py-4">
          <h4 className="font-semibold text-sm mb-3">Price</h4>
          <div className="grid grid-cols-2 gap-2">
            {PRICES.map((p) => {
              const isChecked =
                String(p.min ?? "") === String(minPrice ?? "") &&
                String(p.max ?? "") === String(maxPrice ?? "");

              return (
                <label
                  key={p.label}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm cursor-pointer ${
                    isChecked ? "bg-primary/10" : "bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="price"
                    checked={isChecked}
                    // onClick مش onChange، عشان نقدر نلغي الاختيار لو داس عليه تاني
                    onClick={() => handlePriceChange(p.min, p.max, isChecked)}
                    onChange={() => {}}
                    className="accent-primary"
                  />
                  {p.label}
                </label>
              );
            })}
          </div>
        </section>

        {/* Actions */}
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-full bg-primary py-3 text-white font-medium mt-2"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleClearFilters}
          className="w-full rounded-full border border-primary py-3 text-primary font-medium mt-3"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
import PriceItem from "./PriceItem";

function PriceFilter({
  minPrice,
  maxPrice,
  onPriceChange,
}) {
  const priceRanges = [
    {
      label: "Under 500",
      min: null,
      max: 500,
    },
    {
      label: "500 - 1000",
      min: 500,
      max: 1000,
    },
    {
      label: "1000 - 1500",
      min: 1000,
      max: 1500,
    },
    {
      label: "Above 1500",
      min: 1500,
      max: null,
    },
  ];

  return (
    <div className="py-4">
      <p className="text-textPrimary font-semibold capitalize text-sm">
        price
      </p>

      <ul className="mt-2 space-y-2">
        {priceRanges.map((range) => {
          const isChecked =
            String(range.min ?? "") === String(minPrice ?? "") &&
            String(range.max ?? "") === String(maxPrice ?? "");

          return (
            <PriceItem
              key={range.label}
              label={range.label}
              checked={isChecked}
              onChange={() =>
                onPriceChange(
                  range.min,
                  range.max,
                  isChecked
                )
              }
            />
          );
        })}
      </ul>
    </div>
  );
}

export default PriceFilter;
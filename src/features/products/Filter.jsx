import Search from "../../components/Search";
import FilterIcon from "./../../icons/FilterIcon";
import useProducts from "./useProducts";

// eslint-disable-next-line react/prop-types
function Filter({ isOpen }) {
  const {
    categories,
    handleCategoryChange,
    selectedCategory,
  } = useProducts();

  const allCategories = [
    {
      _id: "all",
      name: "all",
      productsCount: categories.reduce(
        (total, category) => total + category.productsCount,
        0
      ),
    },
    ...categories,
  ];

  return (
    <aside
      className={`h-full overflow-hidden transition-all duration-300 ${
        isOpen ? "w-80" : "w-0 border-0"
      }`}
    >
      <div className="w-72 border mx-auto border-borderLight h-full rounded-md shadow-cardShadow p-4">
        <Search />

        <div className="flex justify-between text-sm tracking-tight py-4">
          <span className="flex items-center text-textPrimary gap-2 capitalize font-semibold tracking-wide">
            <FilterIcon />
            filter
          </span>

          <p className="text-primary hover:text-primaryDark transition-all capitalize cursor-pointer">
            clear all
          </p>
        </div>

        <span className="block w-full border-t border-borderLight"></span>

        <div>
          <p className="text-textPrimary font-semibold capitalize text-sm pt-4">
            categories
          </p>

          <ul className="mt-2 space-y-2">
            {allCategories.map((cat) => {
              const isChecked = cat._id === "all" ? !selectedCategory : selectedCategory === cat._id;;

              return (
                <li
                  key={cat._id}
                  className="flex justify-between"
                >
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-textPrimary capitalize">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        handleCategoryChange(
                          cat._id === "all" ? null : cat._id
                        )
                      }
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

                    {cat.name}
                  </label>

                  <p className="bg-surfaceLavender rounded-xs text-primaryDark text-xs py-1 px-2">
                    {cat.productsCount}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Filter;
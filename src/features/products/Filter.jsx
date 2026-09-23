import Search from "../../components/Search";
import FilterIcon from "./../../icons/FilterIcon";
import useProducts from "./useProducts";
import CategoryFilter from "../categories/CategoryFilter";
import SizeFilter from "./SizeFilter";
import PriceFilter from "./PriceFilter";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

function Filter({ isOpen }) {
  const {
    categories,
    handleCategoryChange,
    selectedCategory,
    handleSizeChange,
    selectedSize,
    handlePriceChange,
    minPrice,
    maxPrice,
    handleClearFilters,
    search,
    handleSearch
  } = useProducts();

  const [searchInput, setSearchInput] = useState(search);

  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    if (debouncedSearch !== search) {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch]);


  useEffect(() => {
    setSearchInput(search);
  }, [search]);


  return (
    <aside
      className={`h-full overflow-hidden transition-all duration-300 ${isOpen ? "w-80" : "w-0 border-0"
        }`}
    >
      <div className="w-72 border mx-auto border-borderLight h-full rounded-md shadow-cardShadow p-4">
        <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />

        <div className="flex justify-between text-sm tracking-tight py-4">
          <span className="flex items-center text-textPrimary gap-2 capitalize font-semibold tracking-wide">
            <FilterIcon />
            filter
          </span>

          <p onClick={handleClearFilters} className="text-primary hover:text-primaryDark transition-all capitalize cursor-pointer">
            clear all
          </p>
        </div>

        <span className="block w-full border-t border-borderLight" />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <span className="block w-full border-t border-borderLight" />

        <SizeFilter
          selectedSize={selectedSize}
          onSizeChange={handleSizeChange} />

        <span className="block w-full border-t border-borderLight" />

        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />

      </div>
    </aside>
  );
}

export default Filter;
import { useState } from "react";
import Filter from "../features/products/Filter";
import MobileFilter from "../features/products/MobileFilter";
import Products from "../features/products/Products";
import PageTitle from "../components/PageTitle";
import useMediaQuery from "./../hooks/useMediaQuery";

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleToggleFilter = () =>
    isDesktop ? setIsFilterOpen((prev) => !prev) : setIsMobileFilterOpen(true);

  return (
    <div
      className={`grid transition-all duration-300 grid-cols-1 ${
        isFilterOpen ? "md:grid-cols-[20rem_1fr]" : "md:grid-cols-[0rem_1fr]"
      }`}
    >
      <PageTitle title="Products" />

      {isDesktop && <Filter isOpen={isFilterOpen} />}

      <Products isFilterOpen={isFilterOpen} onToggleFilter={handleToggleFilter} />

      {!isDesktop && (
        <MobileFilter
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
        />
      )}
    </div>
  );
}
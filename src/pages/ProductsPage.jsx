import { useState } from "react";
import Filter from "../features/products/Filter";
import Products from "../features/products/Products";
import PageTitle from "../components/PageTitle";

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  return (
    <div
      className={`grid transition-all duration-300 ${
        isFilterOpen ? "grid-cols-[20rem_1fr]" : "grid-cols-[0rem_1fr]"
      }`}
    >
      <PageTitle title="Products"/>
      <Filter isOpen={isFilterOpen} />
      <Products
        isFilterOpen={isFilterOpen}
        onToggleFilter={() => setIsFilterOpen((prev) => !prev)}
      />
    </div>
  );
}
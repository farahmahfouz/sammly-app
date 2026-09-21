import CategoryItem from "./CategoryItem";

function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
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
    <div className="py-4">
      <p className="text-textPrimary font-semibold capitalize text-sm ">
        categories
      </p>

      <ul className="mt-2 space-y-2">
        {allCategories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            isChecked={
              category._id === "all"
                ? !selectedCategory
                : selectedCategory === category._id
            }
            onChange={() =>
              onCategoryChange(
                category._id === "all" ? null : category._id
              )
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
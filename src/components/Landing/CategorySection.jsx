import KidsCategorySection from "./CategoriesSection/KidsCategorySection";
import MenCategorySection from "./CategoriesSection/MenCategorySection";
import WomanCatregorySection from "./CategoriesSection/WomanCatregorySection";
function CategorySection() {
  return (
    <section className="py-32 ">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-textColor">CATEGORY SECTION</h2>
        <p className="text-gray-500 mb-11">
          Explore our diverse categories to find the perfect styles <br /> that
          suit your taste and needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-3 pt-32 lg:mx-28">
        {/* Men Section */}
        <MenCategorySection></MenCategorySection>

        {/* Kids Section */}
        <KidsCategorySection></KidsCategorySection>

        {/* Women's Section */}
        <div className="relative">
          <WomanCatregorySection></WomanCatregorySection>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;

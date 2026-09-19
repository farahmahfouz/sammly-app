import Hero from "../components/Landing/Hero";
import CategorySection from "./../components/Landing/CategorySection";
import LandingProductItem from "./../layouts/LandingProductItem";
import Heroo from "../components/Landing/Heroo";
import "../styles/Landing.css"; // Import the CSS file

function Landing() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* CategorySection- section3 */}
      <CategorySection />

      {/* ProductItem- section4 */}
      <section className="mt-5 featured-products-section landing-product-item">
        <div className="text-center mb-6 featured-products-content">
          <p className="text-gray-500">FEATURED PRODUCTS</p>
          <h2 className="text-2xl font-bold text-textColor">BEST SELLER</h2>
          <p className="text-gray-500 text-l">
            Discover our best-selling clothing pieces <br /> that combine style and quality to complete your perfect look
          </p>
        </div>
      </section>

      <div className="h-96 landing-product-item">
        <LandingProductItem className="" />
      </div>

      {/* slider section5 */}
      <Heroo />
    </>
  );
}

export default Landing;
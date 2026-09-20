import "../styles/Landing.css"; // Import the CSS file
import Hero from "../components/Landing/Hero";
import CategorySection from "./../components/Landing/CategorySection";
import Sticker from "../components/Landing/Sticker";
import Discount from "../components/Landing/Discount";
import Review from "../components/Landing/Review";
import Tutorial from "../components/Landing/Tutorial";

function Landing() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* CategorySection- section3 */}
      <CategorySection />

      <Tutorial/>

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


      <Discount/>

      <Review/>

      <Sticker />
    </>
  );
}

export default Landing;
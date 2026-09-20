import "../styles/Landing.css"; // Import the CSS file
import Hero from "../components/Landing/Hero";
import CategorySection from "./../components/Landing/CategorySection";
import Sticker from "../components/Landing/Sticker";
import Discount from "../components/Landing/Discount";
import Review from "../components/Landing/Review";
import Tutorial from "../components/Landing/Tutorial";
import Carrousel from "../components/Landing/Carrousel";

function Landing() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* CategorySection- section3 */}
      <CategorySection />

      <Tutorial/>

      {/* ProductItem- section4 */}
      <Carrousel/>


      <Discount/>

      <Review/>

      <Sticker />
    </>
  );
}

export default Landing;
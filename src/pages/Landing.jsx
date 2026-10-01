import "../styles/Landing.css"; // Import the CSS file
import Hero from "../components/Landing/Hero";
import CategorySection from "./../components/Landing/CategorySection";
import Sticker from "../components/Landing/Sticker";
import Discount from "../components/Landing/Discount";
import Review from "../components/Landing/Review";
import Tutorial from "../components/Landing/Tutorial";
import Carrousel from "../components/Landing/Carrousel";
import PageTitle from "../components/PageTitle";
import useMediaQuery from "../hooks/useMediaQuery";

function Landing() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <PageTitle title="Home" />
      {/* Hero Section */}
      <Hero />

      {/* CategorySection- section3 */}
      <CategorySection />

      {isDesktop && (
        <Tutorial />
      )}

      {/* ProductItem- section4 */}
      <Carrousel />

      {isDesktop && (
        <Discount />
      )}

      <Review />
      {isDesktop && (
        <Sticker />
      )}
    </>
  );
}

export default Landing;
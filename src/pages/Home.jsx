import "../styles/Landing.css";

import Hero from "../components/Landing/Hero";
import CategorySection from "../components/Landing/CategorySection";
import Sticker from "../components/Landing/Sticker";
import Discount from "../components/Landing/Discount";
import Review from "../components/Landing/Review";
import Tutorial from "../components/Landing/Tutorial";
import Carrousel from "../components/Landing/Carrousel";
import PageTitle from "../components/PageTitle";
import Reveal from "../components/Reveal";

import useMediaQuery from "../hooks/useMediaQuery";

function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <PageTitle title="Home" />

      <Hero />

      <Reveal>
        <CategorySection />
      </Reveal>

      {isDesktop && (
        <Reveal>
          <Tutorial />
        </Reveal>
      )}

      <Reveal>
        <Carrousel />
      </Reveal>

      {isDesktop && (
        <Reveal>
          <Discount />
        </Reveal>
      )}

      <Reveal>
        <Review />
      </Reveal>

      {isDesktop && (
        <Reveal>
          <Sticker />
        </Reveal>
      )}
    </>
  );
}

export default Home;
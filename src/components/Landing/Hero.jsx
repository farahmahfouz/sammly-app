import { Link } from "react-router-dom";
import PlayVideo from "../../icons/PlayVideo";
import Fizz from "../../icons/Fizz";
import CarIcon from "../../icons/CarIcon";
import Checked from "../../icons/Checked";
import Cloud from "../../icons/cloud";
import ArrowRight from "../../icons/ArrowRight";

function Hero() {
  return (
    <div
      className="w-full h-auto flex flex-col md:flex-row justify-between items-center container mx-auto"
    >
      <div className="my-auto flex flex-col gap-2 relative">
        <div className="bg-surfacePurple/95  text-primaryDark hover:text-primary rounded-full w-fit px-4 flex gap-1 text-sm font-medium tracking-tight py-2">
          <Fizz />
          Custome T-Shirts
        </div>
        <h1 className="text-md sm:text-xl md:text-3xl lg:text-5xl font-extrabold text-textPrimary tracking-tighter leading-tight">
          Your imagination <br />
          on a{" "}
        </h1>
        <img src="t-shirt-word.png" alt="" className="h-40 w-44 absolute top-10 left-28 rotate-6" />

        <p className="max-w-80 text-textPrimary tracking-wide leading-5 mt-4">
          Turn your photos, designs, or ideas into
          high-quality custom t-shirts. Easy to create,
          fun to wear!
        </p>
        <div className="flex gap-6">
          <Link
            to="/customize"
            style={{
              background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
            }}
            className="rounded-full shadow-cardShadow flex gap-1 items-center text-white px-4 py-2 md:px-6 md:py-3 hover:opacity-90 transition mt-6"
          >
            Create Your Own <ArrowRight/>
          </Link>
          <div
            className="flex gap-1 rounded-full border border-primary bg-transparent text-primary px-4 py-2 md:px-6 md:py-3  transition mt-6"
          >
            <PlayVideo />
            Watch How it works
          </div>
        </div>

        <div className="pt-6 flex gap-12">
          <div className="text-primaryDark flex gap-2 items-center">
            <CarIcon />
            <p className="text-textPrimary text-xs font-semibold tracking-wide leading-5">
              Fast Deliver <br />
              Worldwide

            </p>
          </div>
          <div className="text-primaryDark flex gap-2 items-center">
            <Checked />
            <p className="text-textPrimary text-xs font-semibold tracking-wide leading-5">
              High Quality <br />
              Printing
            </p>
          </div>
          <div className="text-primaryDark flex gap-2 items-center">
            <Cloud/>
            <p className="text-textPrimary text-xs font-semibold tracking-wide leading-5">
              Soft & Comfortable<br />
              Fabric
            </p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <img
        src="hero-home.png"
        alt="New Collection"
        className="w-full h-auto max-w-md md:max-w-xl object-cover mt-6 md:mt-0"
      />
    </div>
  );
}

export default Hero;

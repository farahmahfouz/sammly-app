import { GiSeaStar } from "react-icons/gi";

export default function HeroSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4  mb-20 container mx-auto">
      <div className="md:col-span-2">

        <img
          src="/GirlHeader.png"
          alt="girlHeader"
        />
      </div>
      <div className="bg-white flex items-center md:col-span-2 p-4 ">
        <div className="">
          <div className="text-primary rounded-full py-1 px-4 flex gap-2 items-center mx-auto w-fit mb-4" style={{
            background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
          }}>
            <GiSeaStar />
            <p className="text-sm text-white">Your Style - Your T-Shirt</p>
          </div>
          <div className="mb-5 font-bold text-6xl text-center tracking-tighter">
            Create Your
            <p className="text-primary">Perfect T-Shirt !
            </p>
          </div>
          <p className="text-center tracking-tighter text-textMuted">
            {" "}
            Design custom T-shirts with ease using our intuitive tools. Choose
            colors, fonts, and images, or upload your own artwork. Start
            designing today and wear your creativity with pride!
          </p>
        </div>
      </div>
    </div>
  );
}

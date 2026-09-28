import { Link } from "react-router-dom";
import TeamMembers from "../components/TeamMembers";
import { LuTarget, LuArrowRight } from "react-icons/lu";
import { FaGrinHearts } from "react-icons/fa";
import { GiChestnutLeaf } from "react-icons/gi";
import { LiaAwardSolid } from "react-icons/lia";


const IMAGES = {
  hero: "/hero-tshirt.png",
  story: "/good-vibes.png",
};

const VALUES = [
  {
    title: "Quality",
    icon: <LiaAwardSolid className="w-7 h-7" />,
    iconStyle: "bg-violet-100 text-violet-600",
    cardStyle: "from-violet-50/70",
    text: "We use premium materials and advanced printing techniques to ensure each custom design is vibrant, durable, and crafted with care.",
  },
  {
    title: "Sustainability",
    icon: <GiChestnutLeaf className="w-7 h-7" />,
    iconStyle: "bg-emerald-100 text-emerald-600",
    cardStyle: "from-emerald-50/70",
    text: "We prioritize eco-friendly practices, using organic cotton and non-toxic, water-based inks to reduce our environmental impact.",
  },
  {
    title: "Customer-Centered",
    icon: <FaGrinHearts className="w-7 h-7" />,
    iconStyle: "bg-pink-100 text-pink-500",
    cardStyle: "from-pink-50/70",
    text: "We focus on providing an easy, enjoyable design process and reliable delivery, with customer satisfaction as our top priority.",
  },
];

/* ========= Badge ========= */
const Badge = ({ children }) => (
  <span className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-xs font-semibold tracking-wider uppercase">
    {children}
  </span>
);

export default function AboutUs() {
  return (
    <div className="container mx-auto">
      {/* ================= HERO ================= */}
      <section className="px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-primary tracking-tighter italic mb-2">More than just T-shirts</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-textPrimary leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-primaryDark to-fuchsia-500 bg-clip-text text-transparent">
              Sammly
            </span>
          </h1>
          <p className="mt-5 text-lg text-textMuted max-w-md leading-tight tracking-tight">
            We&apos;re a creative community that believes everyone has a story
            to tell. At Sammly, we turn your ideas, memories and imagination
            into custom T-shirts that are uniquely yours.
          </p>
          <Link
            to="/make-your-own"
            className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primaryGradient text-white font-semibold shadow-cardShadow"
          >
            Start Designing <LuArrowRight />
          </Link>
        </div>

        <div className=" flex justify-center">
          <div className=" w-72 h-72 " />
          <img
            src={IMAGES.hero}
            alt="Custom T-shirt"
            className=""
          />
        </div>
      </section>

      {/* ================= WHO ARE WE ================= */}
      <section className="py-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src={IMAGES.story}
            alt="Good vibes only T-shirt"
            className="w-full max-w-md mx-auto object-cover "
          />
        </div>

        <div>
          <Badge>Who are we?</Badge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-textPrimary leading-snug">
            Your ideas, <br />
            our <span className="text-primaryDark">passion</span>
          </h2>
          <p className="mt-5 text-textMuted tracking-tight leading-relaxed">
            At Sammly, we believe in the power of personal expression. Our
            journey began with a simple idea: everyone should have the
            opportunity to wear something that represents their unique style
            and personality. That&apos;s why we created a platform where
            fashion meets creativity, allowing customers to design their own
            T-shirts and create one-of-a-kind pieces.
          </p>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="relative rounded-3xl bg-gradient-to-r from-violet-100 via-violet-50 to-fuchsia-100 px-6 flex flex-col md:flex-row items-center gap-6 overflow-hidden">
        <div className="shrink-0 w-20 h-20 rounded-full bg-violet-200/70 text-primary flex items-center justify-center">
          <LuTarget className="w-10 h-10" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Our Mission
          </p>
          <h3 className="text-2xl font-bold text-textPrimary mt-1">
            More than just clothing
          </h3>
          <p className="text-textSecondary tracking-tighter mt-2 max-w-lg">
            Our mission is to provide high-quality clothing that you can
            personalize, empowering you to express yourself in your way.
          </p>
        </div>
        <img src="sticky.png" className="w-44 h-44 object-contain" />
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-10 text-center">
        <Badge>Our Values</Badge>
        <h2 className="mt-4 text-3xl font-extrabold text-textPrimary">
          What We <span className="text-primary">Stand For</span>
        </h2>
        <p className="mt-3 text-textMuted max-w-xl mx-auto">
          Our values guide everything we do — from the materials we choose to
          the experience we create for you.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className={`group rounded-2xl bg-gradient-to-br ${v.cardStyle} to-white p-6 shadow-cardShadow border border-white  hover:-translate-y-1 transition duration-300`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${v.iconStyle}`}
              >
                {v.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-indigo-950">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-4 ">
        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-primaryGradient text-white text-xs font-semibold tracking-wider uppercase">
            Our Team
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-snug">
            Creative minds, <br />
            <span className="">real people</span>
          </h2>
          <p className="mt-3 text-sm max-w-md mx-auto text-textMuted">
            We&apos;re a small team with a big dream — to make custom
            clothing simple, fun and meaningful for everyone.
          </p>
        </div>


        <TeamMembers />
      </section>
    </div>
  );
}
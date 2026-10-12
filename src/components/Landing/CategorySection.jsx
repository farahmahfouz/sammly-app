import { motion } from "motion/react";
import Explore from "./../../icons/Explore";
import { Link } from "react-router-dom";
import ArrowRight from "../../icons/ArrowRight";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    id: 1,
    name: "Men",
    description: "Classic & Trendy",
    image: "/categories/man-style.webp",
  },
  {
    id: 2,
    name: "Women",
    description: "Stylish & Comfy",
    image: "/categories/women-style.webp",
  },
  {
    id: 3,
    name: "Kids",
    description: "Fun & Colorful",
    image: "/categories/kids-style.webp",
  },
  {
    id: 4,
    name: "Hoodies",
    description: "Warm & Cozy",
    image: "/categories/hoodies-style.webp",
  },
  {
    id: 5,
    name: "Shoes",
    description: "Everyday Comfort",
    image: "/categories/print-shoes.webp",
  },
  {
    id: 6,
    name: "Accessories",
    description: "Mugs, Bags & More",
    image: "/categories/accessories.webp",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

function CategorySection() {
  return (
    <section className="py-6 md:py-16 container mx-auto">
      <div className="text-start mb-6">
        <span className="flex gap-1 text-primary items-center">
          <Explore />
          <h2 className="text-xs font-semibold uppercase tracking-tighter">
            explore our collection
          </h2>
        </span>

        <div className="flex justify-between">
          <p className="capitalize text-lg lg:text-3xl font-extrabold text-textPrimary">
            shop by style
          </p>

          <Link
            to="/products"
            className="flex gap-2 items-center capitalize text-sm font-medium tracking-tight text-primary hover:text-primaryDark"
          >
            <p>
              view all <span className="hidden md:inline">categories</span>
            </p> <ArrowRight />
          </Link>
        </div>

        <p className="first-letter:capitalize text-textMuted text-sm">
          find the perfect fit for your vibe.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={cardVariants}>
            <CategoryCard cat={cat} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default CategorySection;
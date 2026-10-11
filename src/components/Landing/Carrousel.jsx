import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import ArrowRight from "../../icons/ArrowRight";
import useProducts from "../../features/products/useProducts";

const VISIBLE = 6;
const ITEM_WIDTH = 240;
const GAP = 16;
const STEP = ITEM_WIDTH + GAP;

function Carrousel() {
  const { products } = useProducts();
  const [start, setStart] = useState(0);

  const maxStart = Math.max(0, products.length - VISIBLE);

  const handleNext = () => setStart((prev) => Math.min(prev + 1, maxStart));
  const handlePrev = () => setStart((prev) => Math.max(prev - 1, 0));

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


  return (
    <section className="mx-auto py-6 md:py-16">
      {/* Section Header */}
      <span className="flex items-center gap-1 text-primary container mx-auto">
        <h2 className="text-xs font-semibold uppercase tracking-tighter">
          FEATURED PRODUCTS
        </h2>
      </span>

      <div className="flex justify-between container mx-auto">
        <span>
          <p className="text-lg lg:text-3xl font-extrabold capitalize text-textPrimary">
            popular designs
          </p>

          <p className="text-sm font-medium capitalize text-textSecondary max-w-64 lg:max-w-fit">
            check out some of our best selling custom t-shirts and designs
          </p>
        </span>

        <Link
          to="/products"
          className="flex items-center gap-2 text-sm font-medium capitalize tracking-tight text-primary hover:text-primaryDark"
        >
          <p>
            view all
            <span className="hidden md:inline"> designs</span>
          </p>
          <ArrowRight />
        </Link>
      </div>

      {/* Products */}
      <div className="relative mt-8 flex items-center gap-4 max-w-[84rem] mx-auto">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={start === 0}
          aria-label="Previous"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-cardShadow text-primary transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="rotate-180">
            <ArrowRight />
          </span>
        </button>

        <div className="overflow-hidden" style={{ width: VISIBLE * ITEM_WIDTH + (VISIBLE - 1) * GAP }}>
          <motion.div
            className="flex gap-4 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${start * STEP}px)` }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={cardVariants}
                className="w-60 shrink-0 overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-60 w-60 rounded-lg object-cover shadow-cardShadow"
                />

                <p className="mt-3 text-xs font-semibold text-textPrimary line-clamp-1">
                  {product.name}
                </p>

                <p className="mt-2 font-bold text-primary">
                  EG {product.price}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={start >= maxStart}
          aria-label="Next"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-cardShadow text-primary transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

export default Carrousel;
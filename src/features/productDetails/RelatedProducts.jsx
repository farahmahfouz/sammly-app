import { Link } from "react-router-dom";
import { motion } from "motion/react";

import useRelatedProducts from "./useRelatedProducts";
import ArrowRight from "../../icons/ArrowRight";

const MotionLink = motion.create(Link);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function RelatedProducts() {
  const { relatedProducts: products, isPending } = useRelatedProducts();
  if (isPending) return null;
  if (!products?.length) return null;

  return (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <p className="text-lg md:text-3xl font-extrabold capitalize text-textPrimary">
          you may also like
        </p>

        <Link
          to="/products"
          className="flex items-center gap-2 text-sm font-medium capitalize tracking-tight text-primary hover:text-primaryDark"
        >
          view all products
          <ArrowRight />
        </Link>
      </div>

      <motion.div
        className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {products.map((product) => (
          <MotionLink
            key={product._id}
            to={`/product-details/${product._id}`}
            variants={cardVariants}
            className="group block w-44 shrink-0 snap-start sm:w-52"
          >
            <div className="overflow-hidden rounded-lg shadow-cardShadow">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 will-change-transform"
              />
            </div>

            <p className="mt-3 text-xs font-semibold text-textPrimary line-clamp-1">
              {product.name}
            </p>
            <p className="mt-2 font-bold text-primary">EG {product.price}</p>
          </MotionLink>
        ))}
      </motion.div>
    </section>
  );
}

export default RelatedProducts;
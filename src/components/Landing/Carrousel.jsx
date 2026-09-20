import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowRight from "../../icons/ArrowRight";
import { getAllProducts } from "../../utils/api/productsapi";

function Carrousel() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);

      try {
        const response = await getAllProducts();

        setProducts(response.products || response);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="container mx-auto py-16">

      {/* Section Header */}
      <span className="flex items-center gap-1 text-primary">
        <h2 className="text-xs font-semibold uppercase tracking-tighter">
          FEATURED PRODUCTS
        </h2>
      </span>

      <div className="flex justify-between">
        <span>
          <p className="text-3xl font-extrabold capitalize text-textPrimary">
            popular designs
          </p>

          <p className="text-sm font-medium capitalize text-textSecondary">
            check out some of our best selling custom t-shirts and designs
          </p>
        </span>

        <Link
          to="/products"
          className="flex items-center gap-2 text-sm font-medium capitalize tracking-tight text-primary hover:text-primaryDark"
        >
          view all products
          <ArrowRight />
        </Link>
      </div>

      {/* Products */}
      <div className="mt-8 flex gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="w-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className=" rounded-lg h-48 w-48 object-cover shadow-cardShadow"
              />

              <p className="mt-3 text-xs font-semibold text-textPrimary line-clamp-1">
                {product.name}
              </p>

              <p className="mt-2 font-bold text-primary">
                EG {product.price}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Carrousel;
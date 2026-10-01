import { Link } from "react-router-dom";
import useRelatedProducts from "./useRelatedProducts"
import ArrowRight from "../../icons/ArrowRight";

function RelatedProducts() {
    const { relatedProducts: products, isPending } = useRelatedProducts();
    if (isPending) return null;
    if (!products?.length) return null;

    return (
        <section className="container mx-auto ">
            <div className="flex justify-between">
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

            {/* Products */}
            <div className="mt-8 flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
                {products.map((product) => (
                    <Link
                        to={`/product-details/${product._id}`}
                        key={product._id}
                        className="group block shrink-0 snap-start w-[calc((100%-2*0.75rem)/3.3)] sm:w-48"
                    >
                        <div className="overflow-hidden rounded-lg shadow-cardShadow">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="aspect-square w-full object-cover transition-transform duration-500 ease-out 
                                group-hover:scale-110 will-change-transform"
                            />
                        </div>

                        <p className="mt-3 text-xs font-semibold text-textPrimary line-clamp-1">
                            {product.name}
                        </p>

                        <p className="mt-2 font-bold text-primary">EG {product.price}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default RelatedProducts
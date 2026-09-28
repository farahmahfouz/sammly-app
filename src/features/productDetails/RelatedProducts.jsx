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
                <p className="text-3xl font-extrabold capitalize text-textPrimary">
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
            <div className="mt-8 flex gap-4">
                {
                    products.map((product) => (
                        <Link  to={`/product-details/${product._id}`} key={product._id} className="w-48 overflow-hidden">
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
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}

export default RelatedProducts
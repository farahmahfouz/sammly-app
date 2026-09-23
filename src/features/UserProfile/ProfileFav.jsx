import { Link } from "react-router-dom";
import Skelton from "../../layouts/Skelton";
import useFavoriteProducts from "../products/useFavoriteProducts";
import Empty from "./Empty";
import ArrowRight from "../../icons/ArrowRight";
import { FaEye } from "react-icons/fa";
import { GiShatteredHeart } from "react-icons/gi";

export default function ProfileFav() {
    const { favoriteProducts, toggleFavorite } = useFavoriteProducts();

    if (!favoriteProducts) {
        return <Skelton />;
    }

    return (
        <div className="flex justify-center">
            {favoriteProducts.length === 0 ? (
                <div className="w-full flex justify-center items-center py-10">
                    <Empty resourceName="Favorite Products" />
                </div>
            ) : (



                <div className="relative grid grid-cols-4 gap-5">
                    {favoriteProducts.map((product) => (
                        <div
                            key={product._id}
                            className="rounded-lg shadow-cardShadow w-full bg-white overflow-hidden"
                        >
                            <figure className="relative">
                                <div
                                    className="bg-white/30 text-primary hover:text-primaryDark transition-all rounded-3xl p-2 absolute top-2 end-4 flex justify-center items-center cursor-pointer "
                                    onClick={() => toggleFavorite(product._id)}
                                >
                                    <GiShatteredHeart />
                                </div>

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className=" h-[220px] w-full object-cover"
                                />
                            </figure>

                            <div className="p-3 flex flex-col gap-2">
                                <h2 className="text-sm font-bold tracking-tighter uppercase line-clamp-1">
                                    {product.name}
                                </h2>

                                <p className="text-sm font-semibold text-textMuted">
                                    EG{product.price}
                                </p>

                                <div className="flex justify-center pt-1 w-full">
                                    <Link
                                        to={`/product-details/${product._id}`}
                                        className="py-1.5 px-3 w-full rounded-full text-primary border border-primary tracking-tighter flex justify-center items-center gap-1.5"
                                    >
                                        <FaEye size={12} />
                                        See Details
                                        <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
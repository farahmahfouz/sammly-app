import Card from "../../components/Card";
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

                <div className="relative grid md:grid-cols-4 gap-5">
                    {favoriteProducts.map((product) => (
                        <Card
                            key={product._id}
                            image={product.image}
                            title={product.name}
                            price={`EG${product.price}`}
                            cornerAction={{
                                icon: <GiShatteredHeart />,
                                onClick: () => toggleFavorite(product._id),
                            }}
                            footer={
                                <Link
                                    to={`/product-details/${product._id}`}
                                    className="py-1.5 px-3 w-full rounded-full text-primary border border-primary tracking-tighter flex justify-center items-center gap-1.5"
                                >
                                    <FaEye size={12} />
                                    See Details
                                    <ArrowRight size={12} />
                                </Link>
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
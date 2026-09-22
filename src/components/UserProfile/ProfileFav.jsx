import { Link } from "react-router-dom";
import Skelton from "../../layouts/Skelton";
import HeartRemove from "../../icons/HeartRemove";
import useFavoriteProducts from "../../features/products/useFavoriteProducts";

export default function ProfileFav() {
    const { favoriteProducts, toggleFavorite } = useFavoriteProducts();

    if (!favoriteProducts) {
        return <Skelton />;
    }

    return (
        <div className="flex justify-center p-3 mx-5">

            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10">
                {favoriteProducts.length === 0 ? (
                    <div className="w-full flex justify-center items-center col-span-3">
                        <img src="/noFav.png" className="w-1/4" alt="No Favorites" />
                    </div>
                ) : (
                    favoriteProducts.map((product) => (
                        <div
                            key={product._id}
                            className="rounded-lg bg-base-100 shadow-xl w-full sm:w-80 "
                        >
                            <figure className="relative pt-5">
                                <div
                                    className=" bg-red-500 text-white rounded-3xl w-8 h-8 absolute top-9 start-4  flex justify-center items-center cursor-pointer"
                                    onClick={() => toggleFavorite(product._id)}
                                >
                                    <HeartRemove />
                                </div>
                                <img
                                    src={product.image}
                                    alt="Shoes"
                                    className="rounded-2xl p-2.5 h-[349px] w-full object-cover"
                                />
                            </figure>
                            <div className="p-4 items-center gap-1 text-center">
                                <div className="flex justify-between">
                                    <h2 className="text-[17px] font-bold uppercase">{product.name}</h2>
                                    <p className="text-xl font-bold text-buttonColor">EG{product.price}</p>
                                </div>
                                <p className="text-gray-500 py-2 capitalize text-nowrap truncate">{product.description}</p>
                                <div className="flex justify-center pt-1 w-full">
                                    <Link
                                        to={`/product-details/${product._id}`}
                                        className="btn w-full rounded text-white bg-buttonColor hover:bg-hoverButton text-lg flex items-center">
                                        See Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
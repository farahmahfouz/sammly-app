import { Link } from "react-router-dom";
import Skelton from "../../layouts/Skelton";
import useDesignProducts from './useDesignProducts';

export default function CardOfDesigner() {
  const { products, isLoading, error } = useDesignProducts();


  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="grid grid-cols-1 xl:grid-cols-3  md:grid-cols-2 gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card bg-base-100 w-80 shadow-xl">
              <Skelton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-10">
      <div className="mb-2 flex items-center justify-center gap-4">
        <span className="h-[1px] w-12 sm:w-16 bg-primaryDark"></span>
        <p className="font-bold text-lg sm:text-xl text-primaryDark tracking-wide uppercase">
          Our Products
        </p>
        <span className="h-[1px] w-12 sm:w-16 bg-primaryDark"></span>
      </div>
      <div className="mb-5 font-bold text-4xl text-textPrimary tracking-tighter text-center">
        Choose your piece
      </div>
      <div className=" flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              to={`/designer/${product._id}`}
              key={product._id}
              className="w-full rounded-lg flex flex-col h-full"
            >
              <figure className="pt-10 h-64 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-xl max-h-full max-w-full object-contain 
               transition-transform duration-500 ease-out 
               hover:scale-110 will-change-transform"
                />
              </figure>

              <div className="flex flex-col p-4 gap-2 flex-1 items-center">
                <h2 className="text-lg font-bold tracking-tighter uppercase">
                  {product.name}
                </h2>

                <p className="text-primary text-xl font-semibold">
                  EG {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

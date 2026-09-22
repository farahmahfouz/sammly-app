import { Link } from "react-router-dom";
import Skelton from "../../layouts/Skelton";
import ArrowRight from "../../icons/ArrowRight";
import Play from "../../icons/Play";
import Order from "../../icons/Order";
import CarIcon from "../../icons/CarIcon";
import Checked from "../../icons/Checked";
import PlayCircleFill from "../../icons/PlayCircleFill";
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
            <div
              key={product._id}
              className="border border-borderLight w-full shadow-cardShadow rounded-lg flex flex-col h-full"
            >
              <figure className="px-5 pt-10 h-64 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-xl max-h-full max-w-full object-contain"
                />
              </figure>

              <div className="flex flex-col p-4 gap-2 flex-1">
                <h2 className="text-lg font-bold tracking-tighter uppercase">
                  {product.name}
                </h2>

                <p className="text-primary text-xl font-semibold">
                  EG {product.price}
                </p>

                <Link
                  to={`/designer/${product._id}`}
                  className="flex items-center justify-center gap-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primaryDark transition duration-300 ease-in-out text-sm p-2 px-3 text-center mt-auto"
                >
                  Custome your design
                  <ArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto bg-surfacePink/40 rounded-lg flex items-center gap-6 mt-10 p-4">
        <div className="flex items-center gap-2 relative">
          <video
            className="w-72 md:w-80 rounded-xl"
            controls
            poster="/tutorial-cover.png"
          >
            <source src="tutorial.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex flex-col gap-1 justify-start flex-1">
          <span className="flex gap-1 text-primary items-center">
            <PlayCircleFill />
            <h2 className="text-xs font-semibold uppercase tracking-tighter">video tutorial</h2>
          </span>
          <div className="flex flex-col gap-1 tracking-tight">
            <p className="capitalize text-2xl font-semibold  text-textPrimary">how to make your own t-shirt.</p>
          </div>

          <div className='flex text-sm tracking-tighter  font-medium gap-4 text-primaryDark'>
            <span className='flex gap-2 items-center'>
              <Checked />
              <p className="text-textSecondary">1. Choose a product</p>
            </span>
            <span className='flex gap-2 items-center'>
              <CarIcon />
              <p className="text-textSecondary">2. Add your design</p>
            </span>
            <span className='flex gap-2 items-center'>
              <Order />
              <p className="text-textSecondary">3. Place your order</p>
            </span>
            <button className='flex gap-2 ml-auto text-sm items-center py-2 px-4 shadow-cardShadow bg-textPrimary rounded-full text-white capitalize '>
              <Play />
              watch full tutorial
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

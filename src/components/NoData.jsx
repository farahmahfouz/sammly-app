import { Link } from "react-router-dom";

export default function NoData() {
    return (
        <div className="w-full min-h-[60vh] flex items-center justify-center px-6">
            <div className="w-full max-w-xl rounded-2xl px-8 py-12 text-center flex flex-col items-center">
                
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6">
                    <span className="text-3xl">✦</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 capitalize">
                    Nothing here yet
                </h2>

                <p className="mt-3 text-sm md:text-base text-gray-500 max-w-sm">
                    We couldn&apos;t find anything to show here.
                    Explore our collection and discover something you love.
                </p>

                <Link
                    to="/"
                    className="mt-7 px-7 py-3 rounded-full bg-primary text-white text-sm font-medium capitalize transition-colors duration-300 hover:bg-primaryDark"
                >
                    Back Home
                </Link>
            </div>
        </div>
    );
}
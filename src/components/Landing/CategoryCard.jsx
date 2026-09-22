import { Link } from "react-router-dom"
import ArrowRight from "../../icons/ArrowRight"

function CategoryCard({ cat }) {
    return (
        <Link
            to="/products"
            key={cat.id}
            className=" rounded-lg overflow-hidden group cursor-pointer shadow-cardShadow block"
        >
            <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="bg-surfaceGray/80 border border-borderLight p-4">
                <div>
                    <div className='flex items-center justify-between text-primary hover:text-primaryDark'>
                        <h3 className="text-base font-semibold capitalize text-textPrimary">{cat.name}</h3>
                        <span className='border border-borderLight p-1 rounded-full'>
                            <ArrowRight />
                        </span>
                    </div>
                    <p className="text-sm tracking-tighter text-textSecondary">{cat.description}</p>
                </div>

            </div>
        </Link>
    )
}

export default CategoryCard
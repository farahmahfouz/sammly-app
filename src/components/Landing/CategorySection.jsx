import Explore from './../../icons/Explore';
import { Link } from "react-router-dom";
import ArrowRight from "../../icons/ArrowRight";
import CategoryCard from './CategoryCard';


const categories = [
  {
    id: 1,
    name: "Men",
    description: "Classic & Trendy",
    image: "/categories/man-style.png",
  },
  {
    id: 2,
    name: "Women",
    description: "Stylish & Comfy",
    image: "/categories/women-style.png",
  },
  {
    id: 3,
    name: "Kids",
    description: "Fun & Colorful",
    image: "/categories/kids-style.png",
  },
  {
    id: 4,
    name: "Hoodies",
    description: "Warm & Cozy",
    image: "/categories/hoodies-style.png",
  },
  {
    id: 5,
    name: "Shoes",
    description: "Everyday Comfort",
    image: "/categories/print-shoes.jpg",
  },
  {
    id: 6,
    name: "Accessories",
    description: "Mugs, Bags & More",
    image: "/categories/accessories.jpg",
  },
];


function CategorySection() {

  return (
    <section className="py-28 container mx-auto">
      <div className="text-start mb-6">
        <span className="flex gap-1 text-primary items-center">
          <Explore />
          <h2 className="text-xs font-semibold uppercase tracking-tighter">explore our collection</h2>
        </span>
        <div className="flex justify-between">
          <p className="capitalize text-3xl font-extrabold text-textPrimary">shop by style</p>
          <Link to="/products" className="flex gap-2 items-center capitalize text-sm font-medium tracking-tight text-primary hover:text-primaryDark">
            view all styles <ArrowRight />
          </Link>
        </div>
        <p className="first-letter:capitalize text-textMuted text-sm">find the perfect fit for your vibe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <CategoryCard cat={cat} key={cat.id} />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;

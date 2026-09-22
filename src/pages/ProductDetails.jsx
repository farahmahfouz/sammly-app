import { useRef } from "react";
import SizeCharts from "../components/Charts/SizeCharts";
import ProductDetailsCard from "../features/productDetails/ProductDetailsCard";
import Review from "../components/Landing/Review";
import Carrousel from './../components/Landing/Carrousel';

export default function ProductDetails() {
  const sizeChartRef = useRef(null);

  const scrollToSizeChart = () => {
    sizeChartRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="container mx-auto">
      <div className="w-full py-10 flex flex-col gap-5">
        <ProductDetailsCard onSizeChartClick={scrollToSizeChart} />

        <Review/>

        <Carrousel/>

        <div ref={sizeChartRef}>
          <SizeCharts />
        </div>
      </div>
    </div>
  );
}
import { useRef } from "react";
import SizeCharts from "../features/productDetails/SizeCharts";
import ProductDetailsCard from "../features/productDetails/ProductDetailsCard";
import RelatedProducts from './../features/productDetails/RelatedProducts';
import ReviewSummary from "../features/reviews/ReviewSummary";
import ReviewForm from "../features/reviews/ReviewForm";
import ReviewsList from "../features/reviews/ReviewsList";

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
      <div className="w-full py-10 flex flex-col gap-12">
        <ProductDetailsCard onSizeChartClick={scrollToSizeChart} />

        <ReviewSummary />

        <ReviewForm/>

        <ReviewsList />

        <RelatedProducts />

        <div ref={sizeChartRef}>
          <SizeCharts />
        </div>
      </div>
    </div>
  );
}
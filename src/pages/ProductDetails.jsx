import { useRef, useState } from "react";
import SizeCharts from "../features/productDetails/SizeCharts";
import ProductDetailsCard from "../features/productDetails/ProductDetailsCard";
import RelatedProducts from './../features/productDetails/RelatedProducts';
import ReviewSummary from "../features/reviews/ReviewSummary";
import ReviewForm from "../features/reviews/ReviewForm";
import ReviewsList from "../features/reviews/ReviewsList";
import Reveal from "../components/Reveal";

export default function ProductDetails() {
  const sizeChartRef = useRef(null);
  const reviewFormRef = useRef(null);
  const [editingReview, setEditingReview] = useState(null);

  const scrollToSizeChart = () => {
    sizeChartRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    reviewFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="container mx-auto">
      <div className="w-full py-10 flex flex-col gap-12">
        <ProductDetailsCard onSizeChartClick={scrollToSizeChart} />

        <Reveal>
          <ReviewSummary />
        </Reveal>

        <Reveal>
          <div ref={reviewFormRef}>
            <ReviewForm
              editingReview={editingReview}
              onCancelEdit={() => setEditingReview(null)} />
          </div>
        </Reveal>

        <Reveal>
          <ReviewsList onEdit={handleEditReview}/>
        </Reveal>

        <Reveal>
          <RelatedProducts />
        </Reveal>

        <Reveal>
          <div ref={sizeChartRef}>
            <SizeCharts />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
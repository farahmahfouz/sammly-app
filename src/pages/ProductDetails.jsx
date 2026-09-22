import ProductDetailsCard from "../features/productDetails/ProductDetailsCard";

export default function ProductDetails() {
  return (
    <div className="container mx-auto">
      <div className="w-full py-10">
        <ProductDetailsCard />

        {/* حطي هنا أي سكاشن تانية زي: */}
        {/* <RelatedProducts /> */}
        {/* <ProductReviews /> */}
      </div>
    </div>
  );
}
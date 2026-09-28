import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductReview } from "../../utils/api/reviewsApi";

function useProductReview() {
  const { id } = useParams();

  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getProductReview(id),
    enabled: !!id,
  });

  return { reviews, isLoading, isError, error };
}

export default useProductReview;
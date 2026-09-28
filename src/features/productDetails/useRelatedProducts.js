import { useParams } from "react-router";
import { getRelatedProducts } from "../../utils/api/productsapi";
import { useQuery } from "@tanstack/react-query";

function useRelatedProducts() {
  const { id } = useParams();
  const { isPending, data: relatedProducts = [] } = useQuery({
    queryKey: ["relatedProducts", id],
    queryFn: () => getRelatedProducts(id),
  });
  return { isPending, relatedProducts };
}

export default useRelatedProducts;

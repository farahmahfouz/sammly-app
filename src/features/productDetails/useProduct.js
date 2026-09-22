import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProductById } from "../../utils/api/productsapi";

function useProduct() {
  const { id } = useParams();
  const { isPending, data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
  console.log(product)
  return { isPending, product };
}

export default useProduct;

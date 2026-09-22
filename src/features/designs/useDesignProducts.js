import { useQuery } from "@tanstack/react-query";
import { getIsDesignableProduct } from "../../utils/api/productsapi";

function useDesignProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["isDesignableProducts"],
    queryFn: getIsDesignableProduct,
  });

  return { products, isLoading, error };
}

export default useDesignProducts;

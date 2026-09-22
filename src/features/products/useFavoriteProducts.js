import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToFavorites,
  getFavoriteProducts,
  removeFromFavorites,
} from "../../utils/api/isFavApi";

function useFavoriteProducts() {
  const queryClient = useQueryClient();
  const { data: favoriteProducts = {}, isLoading } = useQuery({
    queryKey: ["favoriteProducts"],
    queryFn: async () => {
      const response = await getFavoriteProducts();
      const favorites = response.data.favProducts;

      return favorites.reduce((acc, product) => {
        acc[product._id] = true;
        return acc;
      }, {});
    },
  });

  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: async (productId) => {
      if (favoriteProducts[productId]) {
        await removeFromFavorites(productId);
      } else {
        await addToFavorites(productId);
      }

      return productId;
    },

    onSuccess: (productId) => {
      queryClient.setQueryData(
        ["favoriteProducts"],
        (currentFavorites = {}) => ({
          ...currentFavorites,
          [productId]: !currentFavorites[productId],
        }),
      );
    },
  });

  return {
    favoriteProducts,
    toggleFavorite,
    isLoading: isLoading || isPending,
  };
}

export default useFavoriteProducts;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToFavorites,
  getFavoriteProducts,
  removeFromFavorites,
} from "../../utils/api/isFavApi";

function useFavoriteProducts() {
  const queryClient = useQueryClient();

  const {
    data: favoriteProducts = [],
    isLoading,
  } = useQuery({
    queryKey: ["favoriteProducts"],
    queryFn: async () => {
      const response = await getFavoriteProducts();

      return response.data.favProducts;
    },
  });

  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: async ({ productId, isFavorite }) => {
      if (isFavorite) {
        await removeFromFavorites(productId);
      } else {
        await addToFavorites(productId);
      }
    },

    onMutate: async ({ productId, isFavorite }) => {
      await queryClient.cancelQueries({
        queryKey: ["favoriteProducts"],
      });

      const previousFavorites =
        queryClient.getQueryData(["favoriteProducts"]) || [];

      queryClient.setQueryData(
        ["favoriteProducts"],
        (currentFavorites = []) => {
          if (isFavorite) {
            // Remove
            return currentFavorites.filter(
              (product) => product._id !== productId
            );
          }
          return currentFavorites;
        }
      );

      return { previousFavorites };
    },

    // 2. If request fails → rollback UI
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        ["favoriteProducts"],
        context.previousFavorites
      );
    },

    // 3. Sync with server after request finishes
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriteProducts"],
      });
    },
  });

  const handleToggleFavorite = (productId) => {
    const isFavorite = favoriteProducts.some(
      (product) => product._id === productId
    );

    toggleFavorite({
      productId,
      isFavorite,
    });
  };

  return {
    favoriteProducts,
    toggleFavorite: handleToggleFavorite,
    isLoading: isLoading || isPending,
  };
}

export default useFavoriteProducts;
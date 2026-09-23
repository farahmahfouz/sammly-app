import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  addToCart as addToCartApi,
} from "../../utils/api/cartApi";

const CART_QUERY_KEY = ["cart"];

const calculateTotals = (cartItems = []) => {
  const totalQuantity = cartItems.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalPrice = cartItems.reduce((sum, product) => {
    const price =
      product.type === "Product"
        ? product.product.price * product.quantity
        : product.design.totalPrice * product.quantity;
    return sum + price;
  }, 0);
  return { totalQuantity, totalPrice };
};

const getAvailableStock = (product) => {
  if (product?.type === "Product") {
    const stockItem = product?.product?.stock?.find(
      (s) => s?.size === product?.size
    );
    return stockItem?.quantity || 0;
  }
  return Infinity; // For designs or other types, no stock limit
};

function useCart() {
  const queryClient = useQueryClient();

  // Local UI-only state (not server state)
  const [isRemoving, setIsRemoving] = useState(null);
  const [updatingQuantity, setUpdatingQuantity] = useState(null);

  // ----- Fetch cart -----
  const {
    data: cart = [],
    isLoading: loading,
    refetch: fetchCart,
  } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: async () => {
      const response = await getCart();
      return response.data.cart;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { totalQuantity, totalPrice } = calculateTotals(cart);

  // ----- Add to cart -----
  const addToCartMutation = useMutation({
    mutationFn: (cartItem) => addToCartApi(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });

  const addToCart = async (cartItem) => {
    try {
      return await addToCartMutation.mutateAsync(cartItem);
    } catch (error) {
      throw error?.response?.data ?? error;
    }
  };

  // ----- Update quantity (optimistic) -----
  const updateQuantityMutation = useMutation({
    mutationFn: ({ productId, size, quantity }) =>
      updateCartItem(productId, { size, quantity }),
    onMutate: async ({ productId, newQuantity }) => {
      setUpdatingQuantity(productId);
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });

      const previousCart = queryClient.getQueryData(CART_QUERY_KEY);

      queryClient.setQueryData(CART_QUERY_KEY, (old = []) =>
        old.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      toast.error("Failed to update quantity");
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
    },
    onSettled: () => {
      setUpdatingQuantity(null);
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });

  const handleQuantityChange = (productId, newQuantity) => {
    // If already updating this product's quantity, ignore the request
    if (updatingQuantity === productId) return;

    const product = cart.find((item) => item._id === productId);
    if (!product) return;

    const availableStock = getAvailableStock(product);

    // Validate quantity bounds
    if (newQuantity < 1 || newQuantity > availableStock) return;

    updateQuantityMutation.mutate({
      productId,
      size: product.size,
      quantity: newQuantity,
      newQuantity,
    });
  };

  // ----- Remove item (optimistic) -----
  const removeFromCartMutation = useMutation({
    mutationFn: (itemId) => removeFromCart(itemId),
    onMutate: async (itemId) => {
      setIsRemoving(itemId);
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });

      const previousCart = queryClient.getQueryData(CART_QUERY_KEY);

      queryClient.setQueryData(CART_QUERY_KEY, (old = []) =>
        old.filter((item) => item?._id !== itemId)
      );

      return { previousCart };
    },
    onError: (err, _itemId, context) => {
      toast.error(`${err} Error removing product`);
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
    },
    onSettled: () => {
      setIsRemoving(null);
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });

  const handleRemoveFromCart = (itemId) => {
    removeFromCartMutation.mutate(itemId);
  };

  // ----- Clear cart -----
  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.setQueryData(CART_QUERY_KEY, []);
    },
    onError: (err) => {
      toast.error(`${err} Error clearing cart`);
    },
  });

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  return {
    cart,
    loading,
    totalPrice,
    totalQuantity,
    isRemoving,
    isClearing: clearCartMutation.isPending,
    updatingQuantity,
    addToCart,
    handleQuantityChange,
    handleRemoveFromCart,
    handleClearCart,
    getAvailableStock,
    fetchCart,
  };
}

export default useCart;
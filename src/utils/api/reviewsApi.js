import axiosInstance from "./axiosInstance";

export const createReview = async (productId, data) => {
  const res = await axiosInstance.post("/reviews", {
    ...data,
    product: productId,
  });
  return res.data.data.review;
};

export const getProductReview = async (id) => {
  const res = await axiosInstance.get(`products/${id}/reviews`);
  return res.data.data.reviews;
};

export const updateReview = async (reviewId, data) => {
  const res = await axiosInstance.patch(`/reviews/${reviewId}`, data);
  return res.data;
};
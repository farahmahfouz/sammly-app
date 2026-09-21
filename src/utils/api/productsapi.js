import axiosInstance from "./axiosInstance";

export const getAllProducts = async (params) => {
  const response = await axiosInstance.get(`/products`, {
    params: {
      page: params?.page,
      limit: params?.limit,
      sort: params?.sort,
      search: params?.search,
      ...(params?.filter && {
        category: params.filter.value,
      }),
    },
  });
  console.log(response);
  return response.data.data;
};

export const getProductsByPage = async (page, search = "", category = "") => {
  const url = `/products?page=${page}&search=${search}${category ? `&category=${category}` : ""}`;
  const res = await axiosInstance.get(url);
  return {
    products: res.data.data.products,
    pagination: res.data.data.pagination,
  };
};

export const getProductById = (id) => {
  return axiosInstance
    .get(`/products/${id}`)
    .then((res) => res.data.data.product);
};

export const getIsDesignableProduct = async () => {
  try {
    const res = await axiosInstance.get("/products/designable-products");
    return res.data.data.products; // Ensure this matches the response structure
  } catch (error) {
    console.error("Error fetching designable products:", error);
    throw error; // Rethrow error for handling in your component
  }
};

export const getIsDesignableProductById = async (id) => {
  try {
    const res = await axiosInstance.get(`/products/designable-products/${id}`);
    return res.data.data.designableProduct; // Ensure this matches the response structure
  } catch (error) {
    console.error("Error fetching designable products:", error);
    throw error; // Rethrow error for handling in your component
  }
};

export const getCategories = async () => {
  const response = await axiosInstance.get(`/categories`);
  return response.data.data.categories;
};

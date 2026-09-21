import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts as getProducts } from "./../../utils/api/productsapi";
import { getCategories } from "./../../utils/api/productsapi";

function useProducts() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit") ? 10 : Number(searchParams.get("limit"));
  const sort = searchParams.get("sort") || "-createdAt";
  const search = searchParams.get("search") || "";

  const filterValue = searchParams.get("category");
  const filter = useMemo(() => {
    return !filterValue || filterValue === "all"
      ? null
      : { field: "category", value: filterValue };
  }, [filterValue]);

  const {
    isPending: isLoading,
    isError,
    error,
    data = { data: { products: [] }, allCounts: 0 },
  } = useQuery({
    queryKey: ["products", page, limit, filter, sort, search],
    queryFn: () => getProducts({ page, limit, filter, sort, search }),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const products = data.products;
  const count = data.allCounts;
  const totalPages = Math.ceil(count / limit);
  const categories = categoriesData?.data?.categories || [];

  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["products", page + 1, limit, filter, sort, search],
        queryFn: () => getProducts({ page: page + 1, limit, filter, sort, search }),
      });
    }
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["products", page - 1, limit, filter, sort, search],
        queryFn: () => getProducts({ page: page - 1, limit, filter, sort, search }),
      });
    }
  }, [page, totalPages, limit, filter, sort, search, queryClient]);

  const handleSearch = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set("search", value);
      else next.delete("search");
      next.set("page", "1");
      return next;
    });
  };

  const handleSortChange = (value) => {
  setSearchParams((prev) => {
    const next = new URLSearchParams(prev);

    next.set("sort", value);
    next.set("page", "1");

    return next;
  });
}; 
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
  };

  const handleCategoryChange = (categoryId) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (categoryId) next.set("category", categoryId);
      else next.delete("category");
      next.set("page", "1");
      return next;
    });
  };

  return {
    products,
    currentPage: page,
    totalPages,
    search,
    isLoading,
    isError,
    error,
    handleSearch,
    handlePageChange,
    handleSortChange,
    handleCategoryChange,
    categories,
  };
}

export default useProducts;
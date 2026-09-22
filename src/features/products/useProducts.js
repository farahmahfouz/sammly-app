import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts as getProducts } from "./../../utils/api/productsapi";
import { getCategories } from "./../../utils/api/productsapi";

function useProducts() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? 8
    : Number(searchParams.get("limit"));
  const sort = searchParams.get("sort") || "-createdAt";
  const search = searchParams.get("search") || "";

  const filterValue = searchParams.get("category");
  const sizeValue = searchParams.get("size");

  const minPrice = searchParams.get("price[gte]");
  const maxPrice = searchParams.get("price[lte]");

  const filter = useMemo(() => {
    const filters = {};
    if (filterValue && filterValue !== "all") filters.category = filterValue;
    if (sizeValue) filters["stock.size"] = sizeValue;
    if (minPrice) {
      filters["price[gte]"] = minPrice;
    }

    if (maxPrice) {
      filters["price[lte]"] = maxPrice;
    }
    return Object.keys(filters).length ? filters : null;
  }, [filterValue, sizeValue, minPrice, maxPrice]);

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

  const categories = categoriesData || [];
  const products = data.products || [];
  const totalPages = data.pagination?.totalPages || 0;
  const totalCount = data.pagination?.totalProducts ?? 0;

  const startItem = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalCount);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(totalPages));
        return next;
      });
    }
  }, [page, totalPages, setSearchParams]);

  useEffect(() => {
    if (totalPages === 0) return;

    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["products", page + 1, limit, filter, sort, search],
        queryFn: () =>
          getProducts({ page: page + 1, limit, filter, sort, search }),
      });
    }
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["products", page - 1, limit, filter, sort, search],
        queryFn: () =>
          getProducts({ page: page - 1, limit, filter, sort, search }),
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

  const handleSizeChange = (size) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (sizeValue === size) next.delete("size");
      else next.set("size", size);
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

  const handlePriceChange = (min, max, isChecked) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (isChecked) {
        next.delete("price[gte]");
        next.delete("price[lte]");
      } else {
        if (min !== null) {
          next.set("price[gte]", String(min));
        } else {
          next.delete("price[gte]");
        }

        if (max !== null) {
          next.set("price[lte]", String(max));
        } else {
          next.delete("price[lte]");
        }
      }

      next.set("page", "1");

      return next;
    });
  };

  const handleClearFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.delete("category");
      next.delete("size");
      next.delete("price[gte]");
      next.delete("price[lte]");

      next.set("page", "1");

      return next;
    });
  };

  return {
    products,
    currentPage: page,
    totalPages,
    totalCount,
    startItem,
    endItem,
    limit,
    search,
    isLoading,
    isError,
    error,
    handleSearch,
    handlePageChange,
    handleSortChange,
    handleCategoryChange,
    handleSizeChange,
    handlePriceChange,
    handleClearFilters,
    categories,
    selectedCategory: filterValue,
    selectedSize: sizeValue,
    minPrice,
    maxPrice,
  };
}

export default useProducts;

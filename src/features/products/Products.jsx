/* eslint-disable no-unused-vars */
import useProducts from "./useProducts";

import NoData from "../../components/NoData";
import Product from "./Product";
import Dropdown from "../../components/DropDown";
import FilterIcon from "../../icons/FilterIcon";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import useMediaQuery from "../../hooks/useMediaQuery";
import Search from "../../components/Search";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

function Products({ isFilterOpen, onToggleFilter, ...restProps }) {
    const {
        products,
        isError,
        isLoading,
        handleSortChange,
        currentPage,
        totalPages,
        handlePageChange,
        startItem,
        endItem,
        totalCount,
        search,
        handleSearch
    } = useProducts();

    const [searchInput, setSearchInput] = useState(search);

    const debouncedSearch = useDebounce(searchInput, 400);

    useEffect(() => {
        if (debouncedSearch !== search) {
            handleSearch(debouncedSearch);
        }
    }, [debouncedSearch, handleSearch, search]);


    useEffect(() => {
        setSearchInput(search);
    }, [search]);



    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center p-10 overflow-y-scroll">
                <NoData />
            </div>
        );
    }

    if (isLoading) return <Spinner />;

    if (products?.length === 0) { return (<div className="w-full min-h-[60vh] flex items-center justify-center"> <NoData /> </div>); }

    return (
        <div className="md:py-6 px-2 md:px-12">
            <div className="md:hidden py-2">
                <Search
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <div className="flex justify-between items-center">
                <p className="text-textMuted tracking-tighter text-sm first-letter:capitalize">
                    showing {startItem} - {endItem} of {totalCount} products
                </p>
                <div className="flex gap-1 capitalize text-textMuted items-center  text-sm">
                    sort by
                    <Dropdown
                        options={[
                            {
                                value: "-createdAt",
                                label: "Newest",
                            },
                            {
                                value: "createdAt",
                                label: "Oldest",
                            },
                        ]}
                        onSelect={handleSortChange}
                    />

                    <button onClick={onToggleFilter} className="text-primary bg-surfaceLavender rounded-md p-2 hover:text-primaryDark focus:none"><FilterIcon /></button>
                </div>
            </div>
            <div className="w-full relative">
                <div className="w-full md:py-10 pt-2">
                    <div
                        className={`grid gap-3 md:gap-6 justify-items-start grid-cols-2 md:[grid-template-columns:repeat(auto-fit,minmax(var(--card-min),1fr))]`}
                        style={{ '--card-min': isFilterOpen ? '230px' : '210px' }}
                    >
                        {products?.map((product) => (
                            <Product
                                isFilterOpen={isFilterOpen}
                                product={product}
                                key={product._id}
                            />
                        ))}
                    </div>
                </div>
                {totalPages > 1 && (
                    <Pagination
                        onPageChange={handlePageChange}
                        totalPages={totalPages}
                        currentPage={currentPage}
                    />
                )}
            </div>
        </div>
    );
}

export default Products;

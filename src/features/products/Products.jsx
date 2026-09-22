/* eslint-disable no-unused-vars */
import useProducts from "./useProducts";

import NoData from "../../components/NoData";
import Product from "./Product";
import Dropdown from "../../components/DropDown";
import FilterIcon from "../../icons/FilterIcon";
import Pagination from "../../components/Pagination";

function Products({ isFilterOpen, onToggleFilter, ...restProps }) {
    const {
        products,
        isError,
        error,
        handleSortChange,
        currentPage,
        totalPages,
        handlePageChange,
        startItem,
        endItem,
        totalCount,
    } = useProducts();

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center p-10 overflow-y-scroll">
                <NoData />

                <h2 className="text-center text-red-600 mt-4">
                    Error: {error?.message}
                </h2>
            </div>
        );
    }

    if (products?.length === 0) { return (<div className="w-full min-h-[60vh] flex items-center justify-center"> <NoData /> </div>); }

    return (
        <div className="md:py-6 px-12">
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
                    <div className="grid gap-6 justify-items-center"
                        style={{
                            gridTemplateColumns: `repeat(auto-fit, minmax(${isFilterOpen ? '230px' : '210px'}, 1fr))`,
                        }}>
                        {products?.map((product) => (
                            <Product
                                isFilterOpen={isFilterOpen}
                                product={product}
                                key={product._id}
                            />
                        ))
                        }
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

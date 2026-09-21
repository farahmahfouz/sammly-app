/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useProducts from "./useProducts";

import NoData from "../../components/NoData";
import Product from "./Product";
import Dropdown from "../../components/DropDown";
import FilterIcon from "../../icons/FilterIcon";

function Products({ isFilterOpen, onToggleFilter, ...restProps }) {
    const {
        products,
        isError,
        error,
        handleSortChange,
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

    return (
        <div className="md:py-6 px-12">
            <div className="flex justify-between items-center">
                <p className="text-textMuted tracking-tighter text-sm first-letter:capitalize">showing 1 - 4 of {products?.length} products</p>
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

                    {/* Products Grid */}
                    <div className={`grid gap-6 justify-items-center ${isFilterOpen
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
                        }`}>

                        {/* No Data */}
                        {products?.length === 0 ? (
                            <div className="w-full flex justify-center items-center col-span-full">
                                <NoData />
                            </div>
                        ) : (
                            products?.map((product) => (
                                <Product
                                    isFilterOpen={isFilterOpen}
                                    product={product}
                                    key={product._id}
                                />
                            ))
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;

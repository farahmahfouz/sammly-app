/* eslint-disable react/prop-types */
import SearchIcon from "../icons/SearchIcon";

function Search({ value = "", onChange, placeholder = "Search...", }) {
    return (
        <div className="relative w-full max-w-md flex items-center">
            <span className="absolute left-4 flex items-center pointer-events-none text-textSecondary">
                <SearchIcon />
            </span>
            <input type="search" value={value} onChange={onChange} placeholder={placeholder}
                className="w-full rounded-full border border-surfaceLavender bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
        </div>
    );
}
export default Search;
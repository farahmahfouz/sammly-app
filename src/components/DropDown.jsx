/* eslint-disable react/prop-types */
import { useState } from "react";
import ArrowLeft from './../icons/ArrowLeft';

function Dropdown({ options = [], onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0] || "Newest");

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
        onSelect?.(option);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full flex items-center gap-2 justify-between px-3 py-2 rounded-md border border-surfaceMuted bg-white text-sm font-semibold text-textPrimary"
            >
                {selected?.label || "Select"}
                <ArrowLeft
                    className={`w-3 h-3  transition-transform duration-300 -rotate-90 text-textSecondary ${
                        isOpen ? "rotate-90" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <ul className="absolute z-10 mt-2 w-full bg-white border border-surfaceGray rounded-md shadow-lg overflow-hidden">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className="px-4 py-2 text-sm cursor-pointer hover:bg-surfaceGray transition"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
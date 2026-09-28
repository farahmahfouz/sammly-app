import { TbChevronDown } from "react-icons/tb";

function FaqItem({ item, isOpen, onToggle }) {
    return (
        <div className="border-b border-borderLight last:border-b-0">
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-4 text-start"
            >
                <span
                    className={`text-sm md:text-base font-medium transition-colors ${isOpen ? "text-primary" : "text-textPrimary"
                        }`}
                >
                    {item.q}
                </span>
                <TbChevronDown
                    className={`shrink-0 text-xl text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="pb-4 text-sm text-textMuted leading-relaxed">
                        {item.a}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FaqItem;
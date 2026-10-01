export default function Card({
    image,
    title,
    price,
    description,
    cornerAction, // { icon, onClick }  (اختياري)
    footer,       // الزرار أو أي JSX تحت (اختياري)
    className = "",
    imageClassName = "h-[220px]"
}) {
    return (
        <div
            className={`rounded-lg shadow-cardShadow w-full bg-white overflow-hidden ${className}`}
        >
            <figure className="relative">
                {cornerAction && (
                    <div
                        className="bg-white/30 text-primary hover:text-primaryDark transition-all rounded-3xl p-2 absolute top-2 end-4 flex justify-center items-center cursor-pointer"
                        onClick={cornerAction.onClick}
                    >
                        {cornerAction.icon}
                    </div>
                )}

                <img
                    src={image}
                    alt={title}
                    className={`${imageClassName} w-full object-cover`}
                />
            </figure>

            <div className="p-3 flex flex-col gap-2">
                <h2 className="text-sm font-bold tracking-tighter uppercase line-clamp-1">
                    {title}
                </h2>

                {price && (
                    <p className="text-sm font-semibold text-textMuted">
                        {price}
                    </p>
                )}

                {description && (
                    <p className="text-sm text-gray-500 capitalize truncate">
                        {description}
                    </p>
                )}

                {footer && <div className="flex justify-center pt-1 w-full">{footer}</div>}
            </div>
        </div>
    );
}
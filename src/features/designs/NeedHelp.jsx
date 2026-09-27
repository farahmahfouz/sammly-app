function NeedHelp() {
    return (
        <div className="relative w-full flex items-center justify-between gap-6 my-6 rounded-2xl overflow-hidden bg-gradient-to-r from-surfaceLavender/30 via-surfacePurple/20 to-surfaceLavender/40 px-6">
            <div className="flex items-center gap-4 shrink-0">
                <img
                    src="/purple.png"
                    alt="t-shirt icon"
                    className="w-44  object-contain shrink-0"
                />

                <div>
                    <h3 className="font-bold text-base sm:text-lg text-textPrimary tracking-tight">
                        Need help?
                    </h3>
                    <p className="text-sm text-textSecondary max-w-xs">
                        Check out our tutorial video to see how easy it is to create your own t-shirt.
                    </p>
                </div>
            </div>

            <button
                onClick={() => {
                    /* افتح الفيديو هنا */
                }}
                className="flex items-center gap-2 bg-white text-primary font-semibold text-sm py-2.5 px-5 rounded-full shadow-sm border border-primary/20 hover:bg-primary/5 transition duration-300 ease-in-out shrink-0"
            >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 1L9 5L1 9V1Z" fill="white" />
                    </svg>
                </span>
                Watch Tutorial
            </button>

            <div className="relative hidden md:flex items-center shrink-0 pr-2">
                <img
                    src="/idea.png"
                    alt="your idea on a t-shirt"
                    className="h-20 object-contain"
                />
            </div>
        </div>
    );
}

export default NeedHelp;
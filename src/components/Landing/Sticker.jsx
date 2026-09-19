import ArrowRight from "../../icons/ArrowRight"

function Sticker() {
    return (
        <div className="bg-surfacePurple/95 container mx-auto flex items-center my-12 justify-between py-2 pl-6 pr-16 rounded-lg">
            <div className="flex items-center gap-4 min-w-0">
                <img
                    src="sticker1.png"
                    alt="t-shirt sticker"
                    className="w-40 shrink-0"
                />

                <div className="flex flex-col gap-2 min-w-0">
                    <p className="text-textPrimary text-lg capitalize font-bold whitespace-nowrap">
                        ready to create something unique?
                    </p>

                    <p className="text-textSecondary text-md whitespace-nowrap">
                        your ideas, our quality - custom t-shirts made easy.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <img src="sticker2.png" alt="t-shirt sticker2" />

                <button className="flex items-center gap-1 px-6 py-2 shadow-primary bg-primaryDark text-white hover:bg-primary transition-all capitalize text-sm tracking-tight rounded-full">
                    start customizing
                    <ArrowRight />
                </button>
            </div>

        </div>
    )
}

export default Sticker
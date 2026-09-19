import ArrowRight from "../../icons/ArrowRight"

function Discount() {
    return (
        <div className="container mx-auto rounded-lg flex justify-between items-center px-6" style={{
            background: "linear-gradient(to right, #81B3DC, #ce6ada33)",
        }}>
            <div className="flex flex-col gap-2 items-start">
                <span className="bg-primaryDark/80 uppercase text-xs text-white tracking-tighter rounded-full px-3 py-1">limited time</span>
                <div>
                    <p className="uppercase text-textPrimary text-2xl font-extrabold tracking-tighter">get 20% off</p>
                    <p className="text-textPrimary text-md tracking-tight">on your first custom t-shirt order!</p>
                </div>
                <button className="bg-textPrimary capitalize text-sm text-white flex gap-2 rounded-full hover:opacity-95 py-1 px-6 items-center">shop now <ArrowRight /></button>
            </div>

            <div className="flex gap-4 items-center">
                <img src="discount.png" alt="" className="max-w-96 h-56 object-cover" />
                <div className="w-64 rounded-[20px] bg-[#f3eaff] px-6 py-4 text-center">

                    <h4 className="mb-3 text-sm font-semibold text-gray-900">
                        Offer ends in
                    </h4>

                    <div className="flex items-center justify-center gap-2">

                        <div className="flex flex-col items-center">
                            <span id="hours" className="text-2xl font-semibold text-gray-900">
                                02
                            </span>
                            <span className="mt-1 text-[10px] text-gray-500">
                                Hours
                            </span>
                        </div>

                        <span className="mb-4 text-2xl font-semibold">:</span>

                        <div className="flex flex-col items-center">
                            <span id="minutes" className="text-2xl font-semibold text-gray-900">
                                14
                            </span>
                            <span className="mt-1 text-[10px] text-gray-500">
                                Minutes
                            </span>
                        </div>

                        <span className="mb-4 text-2xl font-semibold">:</span>

                        <div className="flex flex-col items-center">
                            <span id="seconds" className="text-2xl font-semibold text-gray-900">
                                36
                            </span>
                            <span className="mt-1 text-[10px] text-gray-500">
                                Seconds
                            </span>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Discount
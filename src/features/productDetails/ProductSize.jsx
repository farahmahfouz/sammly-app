import RadioComponent from "../../components/RadioComponent"
import { PiResizeBold } from "react-icons/pi";


function ProductSize({ setSelectedSize, stockAvailable }) {
    return (
        <div className="flex justify-between items-start">
            <RadioComponent setSize={setSelectedSize} stock={stockAvailable} />
            <button
                className="font-bold capitalize tracking-tighter text-primary hover:text-primaryDark flex gap-1 items-center"
            >
                <PiResizeBold />

                <span className="text-sm">
                    size chart
                </span>
            </button>
            {/* <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <form method="dialog">
                        <div className="p-3">
                            <button className="float-right rounded-full">
                                <XIcon />
                            </button>
                        </div>
                    </form>
                    <h3 className="font-bold text-lg">Size Charts</h3>
                    <p className="py-4">Choose your size carefully ..</p>
                    <div className="modal-action justify-center">
                        <form method="dialog">
                            <SizeCharts />
                        </form>
                    </div>
                </div>
            </dialog> */}
        </div>
    )
}

export default ProductSize
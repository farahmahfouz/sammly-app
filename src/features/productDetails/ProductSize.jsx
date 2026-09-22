import RadioComponent from "../../components/RadioComponent"
import { PiResizeBold } from "react-icons/pi";


function ProductSize({ setSelectedSize, stockAvailable, onSizeChartClick }) {
    return (
        <div className="flex justify-between items-start">
            <RadioComponent setSize={setSelectedSize} stock={stockAvailable} />
            <button
                onClick={onSizeChartClick}
                className="font-bold capitalize tracking-tighter text-primary hover:text-primaryDark flex gap-1 items-center"
            >
                <PiResizeBold />

                <span className="text-sm">
                    size chart
                </span>
            </button>
        </div>
    )
}

export default ProductSize
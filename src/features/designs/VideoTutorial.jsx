import useMediaQuery from "../../hooks/useMediaQuery";

import Play from "../../icons/Play";
import Order from "../../icons/Order";
import CarIcon from "../../icons/CarIcon";
import Checked from "../../icons/Checked";
import PlayCircleFill from "../../icons/PlayCircleFill";

function VideoTutorial() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return (
        <>
            {isDesktop && (
                <div className="container mx-auto bg-surfacePink/40 rounded-lg flex items-center gap-6 mt-10 p-4">
                    <div className="flex items-center gap-2 relative">
                        <video
                            className="w-72 md:w-80 rounded-xl"
                            controls
                            poster="/tutorial-cover.png"
                        >
                            <source src="tutorial.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="flex flex-col gap-1 justify-start flex-1">
                        <span className="flex gap-1 text-primary items-center">
                            <PlayCircleFill />
                            <h2 className="text-xs font-semibold uppercase tracking-tighter">video tutorial</h2>
                        </span>
                        <div className="flex flex-col gap-1 tracking-tight">
                            <p className="capitalize text-2xl font-semibold  text-textPrimary">how to make your own t-shirt.</p>
                        </div>
                        <div className='flex text-sm tracking-tighter font-medium gap-4 text-primaryDark'>
                            <span className='flex gap-2 items-center'>
                                <Checked />
                                <p className="text-textSecondary">1. Choose a product</p>
                            </span>
                            <span className='flex gap-2 items-center'>
                                <CarIcon />
                                <p className="text-textSecondary">2. Add your design</p>
                            </span>
                            <span className='flex gap-2 items-center'>
                                <Order />
                                <p className="text-textSecondary">3. Place your order</p>
                            </span>
                            <button className='flex gap-2 ml-auto text-sm items-center py-2 px-4 shadow-cardShadow bg-textPrimary rounded-full text-white capitalize '>
                                <Play />
                                watch full tutorial
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default VideoTutorial
import CarIcon from '../../icons/CarIcon';
import Checked from '../../icons/Checked';
import Order from '../../icons/Order';
import PlayCircleFill from '../../icons/PlayCircleFill';
import Play from './../../icons/Play';

function Tutorial() {
  return (
    <div className="container mx-auto bg-surfacePink/40 rounded-lg grid grid-cols-2  p-6">
      <div className="flex flex-col gap-4 justify-start items-start">
        <span className="flex gap-1 text-primary items-center">
          <PlayCircleFill />
          <h2 className="text-xs font-semibold uppercase tracking-tighter">video tutorial</h2>
        </span>
        <div className="flex flex-col gap-1 tracking-tight">
          <p className="capitalize text-3xl font-extrabold max-w-72 text-textPrimary">how to make your own t-shirt.</p>
          <p className="text-textSecondary max-w-72">watch this quick video and learn how to customize your t-shirt in just a few clicks!</p>
        </div>

        <div className='flex text-sm tracking-tighter font-medium gap-4 text-primaryDark'>
          <span className='flex gap-2 items-center'>
            <Checked />
            <p className="text-textPrimary">1. Choose a product</p>
          </span>
          <span className='flex gap-2 items-center'>
            <CarIcon />
            <p className="text-textPrimary">2. Add your design</p>
          </span>
          <span className='flex gap-2 items-center'>
            <Order />
            <p className="text-textPrimary">3. Place your order</p>
          </span>
        </div>

        <button className='flex gap-2 text-sm items-center py-2 px-4 shadow-cardShadow bg-textPrimary rounded-full text-white capitalize '>
          <Play />
          watch full tutorial
        </button>
      </div>
      <video className="w-full h-full object-fill rounded-xl"
        controls
        poster="/tutorial-cover.png">
        <source src='tutorial.mp4' type="video/mp4" ></source>
      </video>
    </div>
  )
}

export default Tutorial
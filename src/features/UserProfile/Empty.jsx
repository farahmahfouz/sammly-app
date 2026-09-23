import ShoppingBag from './../../icons/ShoppingBag';
import ArrowRight from './../../icons/ArrowRight';
import { Link } from 'react-router-dom';

function Empty({ resourceName }) {
    return (
        <div className='flex flex-col items-center gap-6'>
            <img src="empty.png" alt="" />
            <div className='text-center flex flex-col items-center'>
                <p className='text-textPrimary text-2xl font-bold'>No {resourceName} yet!</p>
                <p className='text-textMuted text-sm tracking-tight max-w-[248px]'>Start exploring our collection and add your favorite T-shirt to see them here!</p>
            </div>
            <Link to="/products" className='flex gap-2 py-2 px-5 items-center rounded-full text-white justify-center font-medium' style={{
                background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
            }}>
                <ShoppingBag />
                Explore Products
                <ArrowRight />
            </Link>
        </div>
    )
}

export default Empty
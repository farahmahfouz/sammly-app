import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className='flex justify-center items-start py-12 '>
      <div className="flex flex-col gap-3">
        <img src="/error4.jpeg" alt="" className='rounded-xl' />
        <Link to="/" className="btn bg-primary text-white hover:bg-primaryDark">Back Home</Link>
      </div>
    </div>
  )
}

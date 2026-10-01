import { Link, useLocation } from 'react-router-dom';

export default function SuccessPayment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get('orderId');
  const totalPrice = searchParams.get('amount');
  const paymentStatus = searchParams.get('paymentStatus');


  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="flex flex-col justify-center items-center border ">
        <img src="/success.png" alt="success payment" className="w-3/6" />
        <div className="">
          <div className="flex justify-center items-center flex-col text-center p-5">
            <h1 className="font-bold">Payment Successful!</h1>
            <h3 className="">Thank you for your purchase</h3>
          </div>
          <div className="flex justify-between   p-3 mt-4 mb-9">
            <div className="mr-4 p-2">
              <p className="">Order ID:</p>
              <p className="">Amount Paid:</p>
              <p className="">Payment Status:</p>
            </div>
            <div className="text-right p-2">
              <div className="text-SecondaryColor">{orderId}</div>
              <div className="text-SecondaryColor">EGP {totalPrice}</div>
              <div className="text-SecondaryColor">{paymentStatus}</div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/" className="btn bg-buttonColor hover:bg-hoverButton text-white p-3 mt-3" replace>Back Home</Link>
    </div>
  );
}

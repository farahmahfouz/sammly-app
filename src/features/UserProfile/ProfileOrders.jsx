import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Skelton from "../../layouts/Skelton";
import Empty from "./Empty";

export default function ProfileOrders() {
  const { userOrders } = useContext(UserContext);

  if (!userOrders) {
    return <Skelton />;
  }

  return (
    <div className="col-span-3">
      <div className="card h-full bg-white p-4">
        <div >

          {userOrders && userOrders.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {userOrders
                .filter((order) => {
                  return order.paymentMethod === "online" && order.orderStatus
                    ? undefined
                    : order;
                })
                .map((order) => (
                  <div
                    key={order._id}
                    className="card bg-slate-50  text-black shadow-xl rounded-lg p-4"
                  >
                    <div className="card-body">
                      <div className="flex justify-between flex-col sm:flex-row">
                        <div className="">
                          <div className="flex justify-between items-start  flex-col sm:flex-row sm:items-center mb-2">
                            <span className="font-bold">ID:</span>
                            <span className="text-xs sm:text-lg">
                              {order._id}
                            </span>
                          </div>

                          <div className="flex justify-between items-start  flex-col sm:flex-row sm:items-center">
                            <span className="font-bold">Date:</span>
                            <span>
                              {new Date(order.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="">
                          <div className="flex justify-between items-start  flex-col sm:flex-row sm:items-center mb-2">
                            <span className="font-bold">Status:</span>
                            <span>{order.orderStatus}</span>
                          </div>
                          <div className="flex justify-between items-start  flex-col sm:flex-row sm:items-center mb-2">
                            <span className="font-bold">Total Price:</span>
                            <span>EG{order.totalPrice}</span>
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="mt-4">
                        <h6 className="text-lg font-bold mb-2">Order Items:</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {order.items.map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center space-x-4"
                            >
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div>
                                <div className="font-bold">
                                  {item.product.name}
                                </div>
                                <div>Quantity: {item.quantity}</div>
                                <div>Price: {item.price}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center py-10">
              <Empty resourceName="Orders" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

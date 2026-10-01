import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Skelton from "../../layouts/Skelton";
import { FiCodesandbox } from "react-icons/fi";
import { CgCalendarDates } from "react-icons/cg";
import { FaCircle } from "react-icons/fa";

import Empty from "./Empty";

// Jan 10, 2026 • 1:25 AM
const formatOrderDate = (value) => {
  const date = new Date(value);
  return {
    day: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

export default function ProfileOrders() {
  const { userOrders } = useContext(UserContext);

  if (!userOrders) {
    return <Skelton />;
  }

  const visibleOrders = userOrders.filter(
    (order) => !(order.paymentMethod === "online" && order.orderStatus)
  );

  return (
    <>
      {visibleOrders.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {visibleOrders.map((order) => {
            const { day, time } = formatOrderDate(order.createdAt);

            return (
              <div
                key={order._id}
                className="text-textPrimary shadow-cardShadow border border-borderLight rounded-lg p-3 sm:p-4"
              >
                {/* الهيدر */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4">
                  {/* الأيقونة + رقم الأوردر + التاريخ */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="bg-surfaceLavender/50 shadow-cardShadow p-3 sm:p-4 rounded-md shrink-0">
                      <FiCodesandbox className="size-5 sm:size-6 text-primary" />
                    </div>

                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex gap-1 items-center text-xs sm:text-sm tracking-tight min-w-0">
                        <span className="shrink-0">Order</span>
                        <span className="truncate">#{order._id}</span>
                      </div>

                      <div className="flex flex-wrap gap-x-2 gap-y-0.5 items-center text-xs sm:text-sm tracking-tight text-textSecondary">
                        <CgCalendarDates className="size-4 sm:size-5 text-textMuted shrink-0" />
                        <span>{day}</span>
                        <span className="text-textMuted">•</span>
                        <span>{time}</span>
                      </div>
                    </div>
                  </div>

                  {/* الحالة + السعر: جنب بعض في الموبايل، فوق بعض في الشاشات الكبيرة */}
                  <div className="flex flex-row flex-wrap sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-4">
                    <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/40 text-emerald-500 text-xs sm:text-sm font-medium">
                      <FaCircle className="size-2" />
                      <span>{order.orderStatus}</span>
                    </div>

                    <div className="inline-flex w-fit items-center gap-2 tracking-tight text-xs sm:text-sm bg-surfaceLavender py-1 px-3 rounded-full">
                      <span className="text-textMuted">Total Price:</span>
                      <span className="text-primary font-semibold whitespace-nowrap">
                        {order.totalPrice} EGP
                      </span>
                    </div>
                  </div>
                </div>

                {/* المنتجات */}
                <div className="mt-3 sm:mt-4 border border-borderLight bg-surfaceLavender/50 rounded-md p-3 sm:py-3 sm:px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {order.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3 sm:gap-4 min-w-0"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-sm shrink-0"
                        />
                        <div className="flex flex-col gap-1 sm:gap-2 min-w-0 text-sm sm:text-base">
                          <div className="font-bold text-textPrimary/80 break-words">
                            {item.product.name}
                          </div>
                          <div className="text-textSecondary tracking-tight">
                            Quantity: {item.quantity}
                          </div>
                          <div className="text-textSecondary tracking-tight flex gap-2">
                            Price:
                            <span className="text-primary">{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center py-10">
          <Empty resourceName="Orders" />
        </div>
      )}
    </>
  );
}
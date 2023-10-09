import React from "react";
import { URL } from "../../api/service";
import { formatTimer } from "../../util/getTimer";

export default function OrderItem({ order }) {
  console.log(order);
  return (
    <div className="w-full rounded-md">
      <table className="w-full">
        <thead className="bg-white h-[80px]">
          <tr className="">
            <th>Sản Phẩm</th>
            <th>Đơn Giá</th>
            <th>Số Lượng</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody className="">
          {order &&
            order.orders.map((i) => {
              const status = {
                D0: "Đang giao",
                D1: "Hoàn thành",
                D2: "Đã hủy",
              };
              let currStatus = status[i.status];
              let textColor;
              if (i.status === "D0") textColor = "#da33caf2";
              if (i.status === "D1") textColor = "#2acd2abd";
              if (i.status === "D2") textColor = "red";
              return (
                <React.Fragment key={i._id}>
                  <tr className="text-center">
                    <td colSpan={4}>
                      <div className="flex justify-around mt-8 mb-2 font-medium text-[16px]">
                        <span>
                          Đặt hàng từ ngày:{" "}
                          {formatTimer(Date.now(i.createdAt), null, true)}
                        </span>
                        <span>Tổng số lượng: {i.quantity}</span>
                        <span>
                          Tổng tiền:{" "}
                          <span className="text-primary-color">
                            {i.amount
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            đ
                          </span>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr key={i._id} className="bg-white">
                    <td className="w-[240px] text-start">
                      {i.items.map((item) => {
                        return (
                          <div key={item._id} className="flex w-[400px]">
                            <img
                              src={item.itemId.pic[0].url}
                              alt={item.itemId.name}
                              className="h-[120px] w-[120px] my-4 ml-4 object-contain"
                            />
                            <span className="mt-4 ml-4">
                              {item.itemId.name}
                            </span>
                          </div>
                        );
                      })}
                      <div className="flex gap-12 my-4 ml-8">
                        <button className="border-[2px] border-solid border-border-color p-2 rounded-md text">
                          Mua lại
                        </button>
                        <button className="bg-primary-color p-2 rounded-md text-white">
                          Đánh giá
                        </button>
                      </div>
                    </td>
                    <td className="h-full text-center">
                      {i.items.map((item) => {
                        return (
                          <div key={item._id} className="my-28">
                            {Math.floor(item.itemId.pricePay * item.quantity)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          </div>
                        );
                      })}
                    </td>

                    <td className="text-center">
                      {i.items.map((item) => {
                        return (
                          <div key={item._id} className="my-28">
                            {item.quantity}
                          </div>
                        );
                      })}
                    </td>
                    {/* <td className="">
                    {Math.floor(i.amount)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </td> */}
                    <td style={{ color: `${textColor}` }}>{currStatus}</td>
                  </tr>
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

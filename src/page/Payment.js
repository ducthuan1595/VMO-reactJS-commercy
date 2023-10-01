import React, { useEffect, useState } from "react";

import MainLayout from "../layout/Main";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Payment() {
  const location = useLocation();
  const cart = useSelector((state) => state.auth.userCurr);
  const codeVoucher = useSelector((state) => state.voucher.codeVoucher);

  const [cartItem, setCartItem] = useState(null);
  const [totalPay, setTotalPay] = useState(0);

  useEffect(() => {
    const handleArr = (arr, cart) => {
      return arr.find((i) => i.id.toString() === cart._id.toString());
    };
    const cartItems = cart.cart.filter((c) =>
      handleArr(location.state.cart, c)
    );
    setCartItem(cartItems);
  }, [location, cart]);

  useEffect(() => {
    let total = 0;
    if (cartItem) {
      cartItem.forEach((c) => {
        total += c.quantity * c.itemId.pricePay;
      });
    }
    if (codeVoucher[0]) {
      const discount = (Math.floor(totalPay) * +codeVoucher[0].discount) / 100;
      total = Math.floor(totalPay) - discount;
    }
    setTotalPay(Math.floor(total));
  }, [cartItem, codeVoucher]);

  useEffect(() => {
    if (codeVoucher[0]) {
      const discount = (Math.floor(totalPay) * +codeVoucher[0].discount) / 100;
      const total = Math.floor(totalPay) - discount;
      console.log(Math.floor(discount), total);
      setTotalPay(Math.floor(total));
    }
  }, [codeVoucher]);

  const handleCheckout = () => {};

  console.log(codeVoucher);
  return (
    <MainLayout>
      <div className="text-[22px] font-semibold w-full bg-white p-5 rounded.md text-primary-color">
        <i className="fa-solid fa-receipt mr-2"></i>
        THANH TOÁN
      </div>
      <div className="bg-[white] p-8 w-full rounded-md mb-4 my-4">
        <table className="w-full">
          <thead>
            <tr className="">
              <th>Sản Phẩm</th>
              <th>Đơn Giá</th>
              <th>Số Lượng</th>
              <th>Số Tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItem &&
              cartItem.map((i) => {
                return (
                  <tr key={i._id} className="">
                    <td className="flex w-[240px]">
                      <img
                        src={`${URL}/image/${i.itemId.pic[0]}`}
                        alt={i.itemId.name}
                        className="h-[120px] my-4 ml-4"
                      />
                      <span className="mt-4 ml-2">{i.itemId.name}</span>
                    </td>
                    <td>
                      {Math.floor(i.itemId.pricePay)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      đ
                    </td>

                    <td>{i.quantity}</td>
                    <td className="">
                      {Math.floor(i.itemId.pricePay * i.quantity)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="bg-white flex flex-col justify-end w-full text-black p-4 mt-4 rounded-md gap-2">
        <div className="flex justify-end items-start gap-2">
          <div className="flex flex-col items-start gap-2">
            <span className="">Tổng tiền hàng:</span>
            <span>Phí giao hàng: </span>
            <span>Voucher: </span>
            <span className="mt-2 font-medium">Tổng thanh toán:</span>
          </div>
          <div className="flex flex-col items-end justify-end gap-2">
            <span className=" ml-2">
              {totalPay &&
                Math.floor(totalPay)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              đ
            </span>
            <span>0đ</span>
            <span>-1000đ</span>
            <div className="flex">
              <span className="text-primary-color text-[24px] font-semibold ml-2">
                {totalPay &&
                  Math.floor(totalPay)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </span>
              <p className="text-primary-color">đ</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end py-4">
          <button
            className="bg-primary-color py-2 px-24 rounded-md text-white ml-2"
            onClick={handleCheckout}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

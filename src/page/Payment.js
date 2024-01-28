import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { requests } from "../api/service";
import MainLayout from "../layout/Main";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import handleToast from "../util/toast";
import { addCart } from "../store/userSlice";
import { getCodeVoucher } from "../store/voucherSlice";

export default function Payment() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.auth.userCurr);
  const codeVoucher = useSelector((state) => state.voucher.codeVoucher);

  const [cartItem, setCartItem] = useState(null);
  const [totalPay, setTotalPay] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [discountVoucher, setDiscountVoucher] = useState(0);

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
    setTotalItem(Math.floor(total));
    if (codeVoucher && +codeVoucher[0].expirationDate > Date.now()) {
      setDiscountVoucher(Math.floor((total * codeVoucher[0].discount) / 100));
      setTotalPay(Math.floor(total - (total * codeVoucher[0].discount) / 100));
    } else {
      setTotalPay(Math.floor(total));
    }
  }, [cartItem, codeVoucher]);

  const handleCheckout = async () => {
    if (cart) {
      const value = cartItem.map((i) => i._id);
      const values = {
        arrCartId: value,
        voucherCode: codeVoucher && codeVoucher[0].code,
      };
      const res = await requests.payOrder(values);
      if (res.message === "ok") {
        dispatch(addCart(res.data.updateUser));
        dispatch(getCodeVoucher(null));
        navigate("/");
        window.scrollTo(0, 0);
        handleToast(
          toast.success,
          "Bạn đã đặt hàng thành công! Kiểm tra email để xem chi tiết."
        );
      } else {
        handleToast(toast.error, "Ôi! Có lỗi sảy ra vui lòng thanh toán lại.");
      }
    }
  };

  // console.log(codeVoucher);
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
                  <tr key={i._id} className="text-center">
                    <td className="flex w-[240px] text-start">
                      <img
                        src={i.itemId.pic[0].url}
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
              {totalItem &&
                Math.floor(totalItem)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              đ
            </span>
            <span>0đ</span>
            <span>
              -
              {discountVoucher.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              đ
            </span>
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

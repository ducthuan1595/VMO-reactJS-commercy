import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { requests } from "../api/service";
import MainLayout from "../layout/Main";
import { addCart } from "../store/userSlice";
import { getCodeVoucher } from "../store/voucherSlice";
import handleToast from "../util/toast";

import CheckoutForm from "../components/payment/CheckoutForm";

export default function Payment() {
  const location = useLocation();
  const cart = useSelector((state) => state.auth.userCurr);
  const codeVoucher = useSelector((state) => state.voucher.codeVoucher);
   const dispatch = useDispatch();
   const navigate = useNavigate();

  const [cartItem, setCartItem] = useState(null);
  const [totalPay, setTotalPay] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [discountVoucher, setDiscountVoucher] = useState(0);
  const [methodPay, setMethodPay] = useState('P1');
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);


  useEffect(() => {
    requests.stripeConfig().then(async (res) => {
      setStripePromise(loadStripe(res.publishableKey));
    });
  }, []);

  useEffect(() => {
    if (totalPay > 0) {
      const req = {
        pay: totalPay,
      };
      requests.createPaymentStripe(req).then(async (res) => {
        if (res.message === "ok") {
          setClientSecret(res.data.clientSecret);
        }
      });
    }
  }, [totalPay]);

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

  const handlePayment = async() => {
    if(methodPay === 'P1') {
      setIsSubmit((state) => !state)
      return;
    }
    if (cart) {
        const value = cartItem.map((i) => i._id);
        const values = {
          arrCartId: value,
          voucherCode: codeVoucher && codeVoucher[0].code,
          methodPay,
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
          handleToast(
            toast.error,
            "Ôi! Có lỗi sảy ra vui lòng thanh toán lại."
          );
        }
      }
  }
  
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
        <div>
          <h1 className="text-2xl font-semibold">Phương thức thanh toán</h1>
          <div className="flex gap-2 items-center my-6">
            <div
              className="border bg-white border-red-200 rounded p-2 cursor-pointer"
              style={{
                borderColor: methodPay === "P1" ? "#fecaca" : "#f3f3f3",
              }}
              onClick={() => setMethodPay("P1")}
            >
              <h2>Thẻ tín dụng/ghi nợ</h2>
            </div>
            <div
              className="border bg-white border-red-200 rounded p-2 cursor-pointer"
              style={{
                borderColor: methodPay === "P2" ? "#fecaca" : "#f3f3f3",
              }}
              onClick={() => setMethodPay("P2")}
            >
              <h2>Thanh toán khi nhận hàng</h2>
            </div>
          </div>
          <div className="pl-8">
            {methodPay === "P1" ? (
              <div className="max-w-[500px] disabled:hover:pointer-events-none">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                      cart={cart}
                      cartItem={cartItem}
                      codeVoucher={codeVoucher}
                      methodPay={methodPay}
                      totalItem={totalItem}
                      totalPay={totalPay}
                      discountVoucher={discountVoucher}
                      isSubmit={isSubmit}
                      setIsSubmit={setIsSubmit}
                      clientSecret={clientSecret}
                    />
                  </Elements>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <span>
                  Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận
                  chuyển (nếu có) áp dụng cả với phí thu hộ.
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="border-b-[1px] border-neutral-200 my-4"></div>

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
            onClick={handlePayment}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

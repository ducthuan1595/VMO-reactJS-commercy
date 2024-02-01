import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

import handleToast from "../../util/toast";
import { addCart } from "../../store/userSlice";
import { getCodeVoucher } from "../../store/voucherSlice";
import { requests } from "../../api/service";

const CheckoutForm = ({
  cart,
  cartItem,
  codeVoucher,
  methodPay,
  clientSecret,
  totalItem,
  totalPay,
  discountVoucher,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async (e) => {
      e.preventDefault();
      
      if (cart && methodPay === 'P1') {
        const value = cartItem.map((i) => i._id);
        const values = {
          arrCartId: value,
          voucherCode: codeVoucher && codeVoucher[0].code,
          methodPay,
        };
          if (!stripe || !elements) {
            setIsProcessing(false);
            return;
          }
          setIsProcessing(true)
          const data = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            redirect: "if_required",
            confirmParams: {
            },
          });
          console.log(data);

          if (data.error) {
            setIsProcessing(false);
            return;
          }
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
        setIsProcessing(false)
      }
    };

  return (
    <div>
      <form onSubmit={handleCheckout}>
        <div className="max-w-[500px]">
          <PaymentElement id="payment-element" onReady={() => console.log('click')} />
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
            className="bg-primary-color py-2 px-24 rounded-md text-white ml-2 disabled:opacity-90"
            type="submit"
            disabled={!stripe || isProcessing}
          >
            {isProcessing ? (
              <i className="fa-solid fa-circle-notch animate-spin"></i>
            ) : (
              "Đặt hàng"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;

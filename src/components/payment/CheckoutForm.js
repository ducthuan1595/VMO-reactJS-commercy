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
  isSubmit,
  setIsSubmit,
  clientSecret,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const handleCheckout = async () => {

      if (cart && isSubmit) {
        const value = cartItem.map((i) => i._id);
        const values = {
          arrCartId: value,
          voucherCode: codeVoucher && codeVoucher[0].code,
          methodPay,
        };
        if (methodPay === "P1") {
          if (!stripe || !elements) {
            return;
          }
          const data = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: {
                token: "tok_visa",
              },
            },
          });

          if (data.error) {
            return;
          }
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
      }
    };
    handleCheckout();

    return () => {
      setIsSubmit(false);
    };
  }, [
    isSubmit,
    cart,
    cartItem,
    codeVoucher,
    stripe,
    dispatch,
    methodPay,
    navigate,
    elements,
    setIsSubmit,
    clientSecret
  ]);

  return (
    <div>
      <form id="payment-form">
        <PaymentElement id="payment-element" />
      </form>
    </div>
  );
};

export default CheckoutForm;

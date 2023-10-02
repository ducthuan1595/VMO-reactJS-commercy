import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Promo from "./Promo";
import { useNavigate } from "react-router-dom";
import handleToast from "../../util/toast";

export default function PayOrder({ checkCartArrId }) {
  const navigate = useNavigate();
  const [codeVoucher, setCodeVoucher] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (checkCartArrId && checkCartArrId.length > 0) {
      const sum = checkCartArrId.reduce((a, b) => a + b.price, 0);
      setTotalPrice(Math.floor(sum));
    } else {
      setTotalPrice(0);
    }
  }, [checkCartArrId]);

  const nagivatePay = () => {
    if (checkCartArrId.length) {
      navigate("/payment", { state: { cart: checkCartArrId } });
      window.scrollTo(0, 0);
    } else {
      handleToast(toast.warning, "Hãy chọn sản phẩm trước khi thanh toán nhé!");
    }
  };

  return (
    <div>
      <Promo isVoucher={true} setCodeVoucher={setCodeVoucher} />
      <div className="bg-white text-black p-4 mt-4 rounded-md">
        {!codeVoucher ? (
          <div className="flex items-center justify-end gap-2 text-[#757575] text-[12px]">
            Chưa có voucher
          </div>
        ) : (
          <div className="flex items-center justify-end gap-2">
            <span>Voucher:</span>
            <i className="fa-solid fa-circle-check text-[green]"></i>{" "}
            <span className="text-[#757575] text-[12px]">{codeVoucher}</span>
          </div>
        )}
        <div className="flex items-center justify-end mt-2">
          <span className="text-[20px]">Tổng thanh toán:</span>
          {"  "}
          <span className="text-primary-color text-[24px] font-semibold ml-2">
            {totalPrice &&
              totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
          <p className="text-primary-color">đ</p>
          <button
            className="bg-primary-color py-2 px-12 rounded-md text-white ml-2"
            onClick={nagivatePay}
          >
            Mua hàng
          </button>
        </div>
      </div>
    </div>
  );
}

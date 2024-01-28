import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import { formatTimer } from "../../util/getTimer";
import { getCodeVoucher } from "../../store/voucherSlice";

export default function Promo({ isVoucher, setCodeVoucher }) {
  const voucherStore = useSelector((state) => state.voucher.vouchers);
  const dispatch = useDispatch();
  const [voucherInput, setVoucherInput] = useState(null);

  const addVoucher = (code) => {
    if (isVoucher) {
      setCodeVoucher(code);
      dispatch(getCodeVoucher(code));
    }
  };

  const handleVoucherInput = () => {
    if (voucherInput) {
      setCodeVoucher(voucherInput);
    }
  };

  return (
    <div className="w-full bg-[white] rounded-md">
      <div className="flex justify-between pt-2">
        <div className="flex justify-start p-4 pb-2 items-center gap-3 text-[20px] font-semibold">
          <i className="fa-solid fa-percent text-primary-color"></i>
          <span className="">ƯU ĐÃI LIÊN QUAN</span>
        </div>
        {isVoucher && (
          <div className="flex items-center justify-end gap-2 pr-4">
            <span>Chọn voucher hoặc </span>
            <input
              type="text"
              placeholder="Nhập mã voucher"
              onChange={(e) => setVoucherInput(e.target.value)}
              value={voucherInput}
              className="p-2 border-[1px] border-solid border-border-color outline-none"
            />
            <button
              className="p-2 bg-primary-color text-white rounded-md"
              onClick={handleVoucherInput}
            >
              Apply
            </button>
          </div>
        )}
      </div>
      <div className="w-[1200px] mx-auto px-4 p-4">
        <Swiper
          // cssMode={true}
          navigation={true}
          slidesPerView={3}
          // pagination={true}
          // mousewheel={true}
          // keyboard={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {voucherStore &&
            voucherStore.map((v) => {
              return (
                <SwiperSlide key={v._id}>
                  <div
                    onClick={() => addVoucher(v.code)}
                    className="border-[1px] border-solid border-border-color p-4 flex justify-start items-center"
                  >
                    <i className="fa-solid fa-rug text-[60px] text-primary-color"></i>
                    <div className="flex flex-col justify-start pl-4">
                      <div className="font-semibold">
                        Mã giảm {v.discount}% chỉ {v.quantity} sản phẩm
                      </div>
                      <div className="text-[14px] text-[#757575]">
                        Đến ngày: {formatTimer(v.expirationDate, null)}
                      </div>
                    </div>
                    {/* <img
                      src={`${URL}/image/${v.pic}`}
                      alt={v.code}
                      className="h-[100px] mx-auto"
                    /> */}
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

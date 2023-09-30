import React from "react";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import { URL } from "../../api/service";
import { formatTimer } from "../../util/getTimer";

export default function Promo() {
  const voucherStore = useSelector((state) => state.voucher.vouchers);
  console.log({ voucherStore });

  return (
    <div className="w-full bg-[white] rounded-md">
      <div className="flex justify-start p-4 items-center gap-3 text-[24px] font-semibold">
        <i className="fa-solid fa-percent text-primary-color"></i>
        <span className="">ƯU ĐÃI LIÊN QUAN</span>
      </div>
      <div className="w-[1200px] mx-auto px-4 p-4">
        <Swiper
          cssMode={true}
          navigation={true}
          slidesPerView={4}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {voucherStore &&
            voucherStore.map((v) => {
              return (
                <SwiperSlide key={v._id}>
                  <div className="border-[1px] border-solid border-border-color p-4">
                    <div className="font-semibold">Mã giảm {v.discount}%</div>
                    <div>Đến ngày: {formatTimer(v.expirationDate, null)}</div>
                    <img
                      src={`${URL}/image/${v.pic}`}
                      alt={v.code}
                      className="h-[100px] mx-auto"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { requests } from "../../api/service";
import { URL } from "../../api/service";
import { getVoucher } from "../../store/voucherSlice";

export default function Voucher() {
  const dispatch = useDispatch();

  const [vouchers, setVoucher] = useState(null);

  const fetchVoucher = async () => {
    const res = await requests.getVoucher(null, null);
    if (res.data.message === "ok") {
      dispatch(getVoucher(res.data.data));
      const activeVoucher = res.data.data.filter(
        (v) => v.expirationDate > Date.now()
      );
      setVoucher(activeVoucher);
    }
  };
  useEffect(() => {
    fetchVoucher();
  }, []);

  return (
    <div className="w-[1200px] h-[300px] flex justify-between gap-2">
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper flex-1 rounded-xl"
      >
        {vouchers &&
          vouchers.map((v) => {
            return (
              <SwiperSlide key={v._id}>
                <img
                  src={`${URL}/image/${v.pic}`}
                  alt={v.code}
                  className="rounded-xl w-full"
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div className="">
        <div>
          <img
            src="/images/banner1.png"
            alt="banner"
            className="h-[150px] w-[300px]"
          />
        </div>
        <div>
          <img
            src="/images/banner2.png"
            alt="banner"
            className="h-[150px] w-[300px]"
          />
        </div>
      </div>
    </div>
  );
}
// style={{ backgroundImage: `url(${item.image})` }}

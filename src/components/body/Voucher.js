import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { requests } from "../../api/service";
import { URL } from "../../api/service";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Voucher() {
  const user = useSelector((state) => state.auth.userCurr);

  const [vouchers, setVoucher] = useState(null);

  const fetchVoucher = async () => {
    if (user && user.token) {
      const res = await requests.getVoucher(null, null, user.token);
      console.log(res.data);
      if (res.data.message === "ok") {
        setVoucher(res.data.data);
      }
    }
  };
  useEffect(() => {
    fetchVoucher();
  }, []);

  console.log({ user });
  return (
    <div className="w-[1200px] h-[300px] flex justify-between gap-2">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper flex-1"
      >
        {vouchers &&
          vouchers.map((v) => {
            return (
              <SwiperSlide key={v._id}>
                <img
                  src={`${URL}/image/${v.pic}`}
                  alt={v.code}
                  className="rounded-xl"
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

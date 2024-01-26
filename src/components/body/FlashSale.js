import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Item from "../Item";
import { requests } from "../../api/service";


// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import CountDown from "../../util/CountDown";
import { getReviews } from "../../actions/getReviews";

export default function FlashSale() {
  const [itemSale, setItemSale] = useState(null);
  const [timer, setTimer] = useState(0);
  const [reviews, setReviews] = useState([]);

  const fetchItem = async () => {
    const res = await requests.getItemFlashSale();
    if (res.data.message === "ok") {
      setItemSale(res.data.data);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    const fetchReview = async () => {
      const res = await getReviews();
      setReviews(res);
    };
    fetchReview();
  }, [])

  useEffect(() => {
    if (itemSale && itemSale.length) {
      let minDate = itemSale[0].flashSaleId.end_date;
      for (let i = 1; i < itemSale.length; i++) {
        if (itemSale[i].flashSaleId.end_date < minDate) {
          minDate = itemSale[i].flashSaleId.end_date;
        }
      }
      setTimer(minDate);
    }
  }, [itemSale]);


  return (
    <div className="bg-[white] rounded-sm">
      <div className="bg-[#fcdab0] flex justify-start items-center gap-2 p-4">
        <i className="fa-solid fa-bolt text-primary-color blink-1"></i>
        <span className="font-bold">FLASH SALE</span> |
        <p className="">Kết Thúc Trong</p>
        {/* <Countdown date={Number(timer)} renderer={rerender} autoStart={true} /> */}
        <CountDown timer={timer} />
      </div>
      <div className="max-w-[1200px] h-[400px] flex justify-between gap-2 pt-4">
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={1}
          // spaceBetween={10}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {itemSale &&
            itemSale.map((i) => {
              const reviewItems = reviews.filter(review => review.itemId === i._id)
              return (
                <SwiperSlide key={i._id}>
                  <Item
                    pic={i.pic}
                    name={i.name}
                    pricePay={i.pricePay}
                    priceOrigin={i.priceInput}
                    percent={i.flashSaleId.discount_percent}
                    page={i.weight}
                    isBorder={false}
                    id={i._id}
                    reviewItems={reviewItems}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

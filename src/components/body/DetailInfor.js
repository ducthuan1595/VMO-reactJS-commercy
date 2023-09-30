import React, { useState } from "react";
import { URL } from "../../api/service";
import Modal from "../../layout/Modal";

export default function DetailInfor({ detailItem }) {
  const [open, setOpen] = useState(false);
  const [sliderNumber, setSliderNumber] = useState(0);

  const handleShowImage = (id) => {
    setOpen(true);
    setSliderNumber(+id);
  };

  const handleSlider = (position) => {
    if (position === "r") {
      setSliderNumber(
        sliderNumber === detailItem?.pic.length - 1 ? 0 : sliderNumber + 1
      );
    } else {
      setSliderNumber(
        sliderNumber === 0 ? detailItem?.pic.length - 1 : sliderNumber - 1
      );
    }
  };

  return (
    <div className="flex justify-center gap-[100px] w-full py-6 px-4 rounded-md bg-[white]">
      {open && (
        <div>
          <Modal setOpen={setOpen} />
          <div className="flex fixed left-[50%] right-[50%] translate-x-[-50%] top-[50%] bottom-[50%] translate-y-[-50%] z-50 justify-center items-center bg-[white] w-[500px]">
            <button
              style={{ marginRight: "20px" }}
              onClick={handleSlider.bind(null, "l")}
            >
              <i className="fa-solid fa-chevron-left text-[100px]"></i>
            </button>
            <img
              className=""
              src={`${URL}/image/${detailItem?.pic[sliderNumber]}`}
              alt={detailItem?.name}
            />
            <button
              style={{ marginLeft: "20px" }}
              onClick={handleSlider.bind(null, "r")}
            >
              <i className="fa-solid fa-chevron-right text-[100px]"></i>
            </button>
          </div>
        </div>
      )}
      <div className="w-[40%]">
        <img
          src={`${URL}/image/${detailItem?.pic[0]}`}
          alt={detailItem?.name}
          className="h-[460px] block mx-auto"
        />
        <div className="flex items-center mt-3 gap-2">
          {detailItem &&
            detailItem?.pic.map((image, index) => {
              return (
                <div key={index}>
                  <img
                    onClick={handleShowImage.bind(null, index)}
                    src={`${URL}/image/${image}`}
                    alt={detailItem?.name}
                    className="w-[80px]"
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-[60%] flex flex-col mr-4">
        <div>
          <div className="text-[22px] font-semibold mb-2">
            {detailItem?.name}
          </div>
          <div className="mb-5">{detailItem?.slogan}</div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div>
                Ngôn ngữ: <strong>Tiếng Việt</strong>
              </div>
              <div className="text-[#f6a500] text-left">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>

                <i class="fa-regular fa-star"></i>
                <span>({detailItem?.weight} đánh giá)</span>
                <span className="text-[#333] border-l-[1px] border-solid border-[#dbdbdb] ml-4 px-4">
                  Đã bán:{" "}
                  {detailItem?.count > 10000
                    ? (detailItem?.count - 10000 + 1)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k+"
                    : detailItem?.count}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span>
                Tác giả: <strong>{detailItem?.author}</strong>
              </span>
              <span>
                Số trang: <strong>{detailItem?.weight}</strong>
              </span>
            </div>
          </div>
          <div className="flex items-center font-bold my-[40px] gap-4">
            <span className="text-primary-color text-[28px]">
              {detailItem?.pricePay
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
              đ
            </span>
            <span className="font-light line-through text-left">
              {detailItem?.priceInput
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
              đ
            </span>
            {detailItem && detailItem.flashSaleId && (
              <span className="bg-[#C92127] px-[4px] py-[6px] text-[white] rounded-md">
                -{detailItem?.flashSaleId?.discount_percent}%
              </span>
            )}
          </div>

          {/* add cart */}
          <div className="">
            <span>Giao hàng tới</span>{" "}
            <button className="text-[#48a7f8] font-semibold ml-4">
              Thay đổi
            </button>
          </div>
          <div>
            <span>Danh mục</span>
            <span className="text-[#48a7f8] ml-4 font-semibold">
              {detailItem?.categoryId.name}
            </span>
          </div>
          <div className="flex items-center my-4">
            <span>Số lượng:</span>
            <div className="flex items-center bg-[white] rounded-md ml-4">
              <button className="py-1 px-4 hover:bg-border-color border-[1px] border-solid border-border-color">
                -
              </button>
              <span className="py-1 px-4 border-[1px] border-solid border-border-color">
                1
              </span>
              <button className="py-1 px-4 border-[1px] border-solid border-border-color hover:bg-border-color">
                +
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <div className="border-[1px] border-solid border-primary-color px-4 py-3 text-primary-color rounded-xl cursor-pointer">
              <i className="fa-solid fa-cart-plus mr-2"></i>
              <span>Thêm vào giỏ hàng</span>
            </div>
            <button className="bg-primary-color px-4 py-3 rounded-xl text-[white]">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

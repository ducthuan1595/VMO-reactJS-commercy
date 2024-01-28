import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addCart } from "../../store/userSlice";
import { requests } from "../../api/service";
import Modal from "../modal/Modal";
import Star from "../Star";

export default function DetailInfor({ detailItem, reviews }) {
  const currUser = useSelector((state) => state.auth.userCurr);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [sliderNumber, setSliderNumber] = useState(Number(0));
  const [quantity, setQuantity] = useState(1);

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

  const handleDecrease = () => {
    if (quantity > 1) {
      let num = quantity - 1;
      setQuantity(num);
    }
  };

  const sendRequest = async () => {
    if (currUser && detailItem) {
      try {
        const value = {
          quantity,
          itemId: detailItem?._id,
        };
        const res = await requests.addCart(value);
        if (res.message === "ok") {
          dispatch(addCart(res.data));
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/login");
    }
  };

  const handleAddCart = async () => {
    await sendRequest();
  };

  const handlePay = async () => {
    const res = await sendRequest();
    if (res) {
      navigate("/order");
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
              src={detailItem?.pic[sliderNumber].url}
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
          src={detailItem?.pic[0].url}
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
                    src={image.url}
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
                Ngôn ngữ: <strong>{detailItem?.language ?? 'Đang cập nhập'}</strong>
              </div>
              <div className="text-[#f6a500] text-left">
                <Star reviews={reviews} isBig={true} />
                <span>({reviews ? reviews.length : 0} đánh giá)</span>
                <span className="text-[#333] border-l-[1px] border-solid border-[#dbdbdb] ml-4 px-4">
                  Đã bán:{" "}
                  {detailItem?.paid > 10000
                    ? (detailItem?.paid - 10000 + 1)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k+"
                    : detailItem?.paid ?? 0}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span>
                Tác giả: <strong>{detailItem?.author}</strong>
              </span>
              <span>
                Số trang: <strong>{detailItem?.pages}</strong>
              </span>
            </div>
          </div>
          <div className="flex items-center font-bold my-[40px] gap-4">
            <span className="text-primary-color text-[28px]">
              {Math.floor(detailItem?.pricePay)
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
            <button className="text-[#48a7f8] font-normal ml-4">
              Thay đổi
            </button>
          </div>
          <div>
            <span>Danh mục</span>
            <span className="text-[#48a7f8] ml-4 font-normal">
              {detailItem?.categoryId.name}
            </span>
          </div>
          <div className="flex items-center my-4">
            <span>Số lượng:</span>
            <div className="flex items-center bg-[white] rounded-md ml-4">
              <button
                className="py-1 px-4 hover:bg-border-color border-[1px] border-solid border-border-color"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="py-1 px-4 border-[1px] border-solid border-border-color">
                {quantity}
              </span>
              <button
                className="py-1 px-4 border-[1px] border-solid border-border-color hover:bg-border-color"
                onClick={() => setQuantity((state) => ++state)}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <div
              onClick={handleAddCart}
              className="border-[1px] border-solid border-primary-color px-4 py-3 text-primary-color rounded-xl cursor-pointer active:opacity-70 hover:bg-yellow-100 hover:border-yellow-100"
            >
              <i className="fa-solid fa-cart-plus mr-2"></i>
              <span>Thêm vào giỏ hàng</span>
            </div>
            <button
              className="bg-primary-color px-4 py-3 rounded-xl text-[white] t-box-shadow"
              onClick={handlePay}
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

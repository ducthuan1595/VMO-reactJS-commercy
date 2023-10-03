import React, { useState } from "react";

import { URL } from "../api/service";
import { requests } from "../api/service";
import { useNavigate } from "react-router-dom";

export default function Item({
  pic,
  name,
  pricePay,
  priceOrigin,
  percent,
  page,
  isBorder,
  id,
  setItem,
  item,
}) {
  const navigate = useNavigate();

  const showDetail = async () => {
    if (id) {
      const res = await requests.getItem(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        id,
        null
      );
      if (res.data.message === "ok") {
        if (item?.length) {
          setItem([]);
        }
        navigate(`/detail-item/${id}`, {
          state: {
            detailItem: res.data.data,
          },
        });
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <div
      className="mx-2 p-2 cursor-pointer child-hover"
      style={{
        border: isBorder ? "1px solid #f2f4f5" : "",
      }}
      onClick={showDetail}
    >
      <div className="mb-2 relative">
        <img
          src={`${URL}/image/${pic[0]}`}
          alt={name}
          className="h-[200px] block mx-auto"
        />
        {percent && !isBorder && (
          <div className="absolute percent-sale">
            <span className="percent text-[16px]">{percent}%</span>
          </div>
        )}
      </div>
      <span className="long-text text-left">{name}</span>
      <div className="flex justify-start items-center gap-4 font-bold text-[18px]">
        <span className="text-[#C92127] ">
          {pricePay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
        </span>
        {isBorder && percent && (
          <span className="bg-[#C92127] px-[4px] py-[2px] text-[white] text-[17px] rounded-md">
            {percent}%
          </span>
        )}
      </div>
      <div className="font-light line-through text-left">
        {priceOrigin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
      </div>
      <div className="text-[#f6a500] text-[12px] text-left">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <span>({page})</span>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function InforItem({ detailItem }) {
  const [showText, setShowText] = useState(false);
  return (
    <div className="bg-[white] p-4 rounded-md">
      <div className="text-[20px] font-semibold mb-4">THÔNG TIN SẢN PHẨM</div>
      <div className="flex items-center text-[#92959b]">
        <div className="mr-[200px]">
          <div>Mã hàng</div>
          <div>Tác giả</div>
          <div>Ngôn ngữ</div>
          <div>Danh mục</div>
          <div>Số trang</div>
        </div>
        <div>
          <div>{detailItem?.barcode}</div>
          <div>{detailItem?.author}</div>
          <div>tiếng việt</div>
          <div>{detailItem?.categoryId.name}</div>
          <div>{detailItem?.weight}</div>
        </div>
      </div>
      <div className="mt-2">{detailItem?.slogan}</div>
      <div className="border-b-[1px] border-solid border-border-color my-4"></div>
      <div className="relative">
        <div
          className=""
          style={{
            height: showText ? "" : "160px",
            overflow: showText ? "" : "hidden",
            // backgroundImage: showText
            //   ? ""
            //   : "linear-gradient(#fff, #fff, #333, #fff)",
          }}
        >
          {detailItem?.description}
        </div>
        <div
          className={showText ? "" : "background_gradient"}
          // className="absolute bg-gradient-to-t to-transparent from-[white] top-0 right-0 left-0 bottom-0"
        ></div>
      </div>
      <button
        className="block mx-auto p-2 text-primary-color"
        onClick={() => setShowText(!showText)}
      >
        {showText ? "Ẩn bớt" : "Xem thêm"}
      </button>
    </div>
  );
}

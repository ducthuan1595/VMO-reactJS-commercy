import React from "react";

export default function News() {
  return (
    <div className="flex justify-center items-center bg-[#9fa7ab] p-4 rounded-t-xl text-[white]">
      <i className="fa-regular fa-envelope text-[24px] mr-2"></i>{" "}
      <span className="text-[18px] mr-[100px]">ĐĂNG KÝ NHẬN BẢN TIN</span>
      <div className="bg-[white] rounded-md py-2">
        <input
          type="text"
          placeholder="Nhập địa chỉ email của bạn"
          className="py-3 px-4 rounded-md w-[450px] text-[12px] outline-none text-[#000]"
        />{" "}
        <button className="bg-primary-color py-2 px-5 mr-[8px] font-semibold mx-[4px] rounded-md">
          Đăng ký
        </button>
      </div>
    </div>
  );
}

import React from "react";
import News from "./News";

export default function Footer() {
  return (
    <div className="w-full md:px-5 lg:w-[1200px] mx-auto bg-[white] pb-16 rounded-t-xl">
      <News />
      <div className="w-full flex pt-[60px]">
        <div className="hidden lg:flex flex-col gap-4 p-4 border-r-[1px] border-solid border-border-color w-[40%]">
          <div>
            <img
              src="/logo/book_logo.png"
              alt="logo"
              className="block mx-auto mb-4"
            />
            <div>
              Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM Công Ty Cổ Phần Phát
              Hành Sách Tim Gi The - 62 Lê Lợi, Quận 1, TP. HCM, Việt
              hi.tim.gi.the@gmail.com nhận đặt hàng trực tuyến và giao hàng tận
              nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng
              cũng như tất cả Hệ Thống trên toàn quốc.
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 text-[24px]">
            <i className="cursor-pointer fa-brands fa-facebook"></i>
            <i className="cursor-pointer fa-brands fa-instagram"></i>
            <i className="cursor-pointer fa-brands fa-youtube"></i>
            <i className="cursor-pointer fa-brands fa-twitter"></i>
            <i className="cursor-pointer fa-brands fa-pinterest"></i>
          </div>
          <div className="flex items-center justify-start gap-2">
            <img
              src="/images/android1.png"
              alt="android"
              className="cursor-pointer w-[100px]"
            />
            <img
              src="/images/appstore1.png"
              alt="appstore"
              className="cursor-pointer w-[100px]"
            />
          </div>
        </div>
        <div className="w-full md:px-5 lg:w-[60%] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ul className="list-none flex flex-col gap-4 px-4">
              <li className="text-[22px] font-semibold">DỊCH VỤ</li>
              <li className="cursor-pointer hover:text-primary-color hover:translate-x-1 scroll-smooth">
                Điều khoản sử dụng
              </li>
              <li className="hover:text-primary-color hover:translate-x-1 cursor-pointer">
                Chính sách bảo mật thông tin cá nhân
              </li>
              <li className="hover:text-primary-color hover:translate-x-1 cursor-pointer">
                Chính sách bảo mật thanh toán
              </li>
              <li className="hover:text-primary-color hover:translate-x-1 cursor-pointer">
                Hệ thống trung tâm - nhà sách
              </li>
            </ul>
            <ul className="list-none flex flex-col gap-4 px-4">
              <li className="text-[22px] font-semibold">HỖ TRỢ</li>
              <li className="hover:text-primary-color hover:translate-x-1 cursor-pointer">
                Chính sách đổi - trả - hoàn tiền
              </li>
              <li className="hover:text-primary-color hover:translate-x-1 cursor-pointer">
                Chính sách bảo hành - bồi hoàn
              </li>
              <li className="hover:text-primary-color hover:translate-x-1 cursor-pointer">
                Chính sách vận chuyển
              </li>
              <li className="hover:text-primary-color hover:translate-x-1 cursor-pointer">
                Phương thức thanh toán và xuất HĐ
              </li>
            </ul>
            <ul className="list-none flex flex-col gap-4 px-4">
              <li className="text-[22px] font-semibold">TÀI KHOẢN</li>
              <li className="hover:text-primary-color hover:translate-x-1 cursor-pointer">
                Đăng nhập/Tạo mới tài khoản
              </li>
              <li className="hover:text-primary-color hover:translate-x-1 cursor-pointer">
                Thay đổi địa chỉ khách hàng
              </li>
              <li className="hover:text-primary-color hover:translate-x-1 cursor-pointer">
                Chi tiết tài khoản
              </li>
              <li className="hover:text-primary-color hover:translate-x-1 cursor-pointer">
                Lịch sử mua hàng
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap flex-col gap-4 px-4 mt-4">
            <h2 className="text-[22px] font-semibold">LIÊN HỆ</h2>
            <ul className="flex items-center justify-between">
              <li>
                <i className="mr-2 fa-solid fa-location-dot"></i>
                <span>60-62 Lê Lợi, Q.1, TP. HCM</span>
              </li>
              <li>
                <i className="mr-2 fa-solid fa-envelope"></i>
                <span>hi.tim.gi.the@gmail.com</span>
              </li>
              <li>
                <i className="mr-2 fa-solid fa-phone"></i>
                <span>19881808</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

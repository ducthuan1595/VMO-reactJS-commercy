import React from "react";
import { useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";

import { login } from "../../store/userSlice";

export default function Profile() {
  const user = useSelector((state) => state.auth.userCurr);
  const location = useLocation();
  console.log(location);

  return (
    <div className="bg-white w-[35%] px-5 pt-3 pb-48 rounded-md">
      <div className="flex items-center mb-4">
        <img
          src="/images/user.jpg"
          alt="user"
          className="w-[80px] opacity-50"
        />
        <h3 className="font-semibold text-[19px]">
          {user.accountName ? user.accountName : "Account"}
        </h3>
      </div>
      <div>
        <ul className="flex flex-col gap-3">
          <NavLink
            to={"/account"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li className="cursor-pointer">
              <i className="fa-regular fa-user  mr-2 text-[19px] text-[#0271dd]"></i>
              Hồ sơ
            </li>
          </NavLink>
          <NavLink
            to={"/purchase"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li className="cursor-pointer">
              <i className="fa-regular fa-file-lines  mr-2 text-[19px] text-[#0271dd]"></i>
              Đơn hàng
            </li>
          </NavLink>
          <li className="cursor-pointer">
            <i className="fa-regular fa-bell  mr-2 text-[19px] text-primary-color"></i>
            Thông báo
          </li>
          <li className="cursor-pointer">
            <i className="fa-regular fa-money-bill-1  mr-2 text-[19px]  text-primary-color"></i>
            Kho voucher
          </li>
        </ul>
      </div>
    </div>
  );
}

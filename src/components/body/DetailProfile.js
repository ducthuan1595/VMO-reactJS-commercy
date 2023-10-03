import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store/userSlice";
import { requests } from "../../api/service";

export default function DetailProfile() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [inputValue, setInputValue] = useState({
    accountName: "",
    fullname: "",
    phone: "",
  });

  const handleChangeInput = (e, name) => {
    const cpState = { ...inputValue };
    cpState[name] = e.target.value;
    setInputValue(cpState);
  };

  const handleUpdateUser = async () => {
    if (token) {
      const res = await requests.updateUser(inputValue, token);
      if (res.data.message === "ok") {
        dispatch(login(res.data));
      }
    }
  };

  return (
    <div className="bg-white w-full pt-6 pb-32">
      <div className="mx-auto w-[65%]">
        <div className="text-[22px] font-semibold mb-8">Hồ Sơ Của Tôi</div>
        <div className="flex gap-6">
          <div className="flex flex-col mt-2 gap-7">
            <span>Tên đăng nhập</span>
            <span>Tên</span>
            <span>Email</span>
            <span>Số điện thoại</span>
            <span>Giới tính</span>
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Tìm gì Thế"
              className="p-2 bg-border-color w-[400px]"
              onChange={(e) => handleChangeInput(e, "accountName")}
              value={inputValue.accountName}
            />
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              onChange={(e) => handleChangeInput(e, "fullname")}
              value={inputValue.fullname}
              className="p-2 bg-border-color"
            />
            <input
              type="text"
              placeholder="example@gmail.com"
              className="p-2 bg-border-color"
              readOnly
              value={"email.com"}
            />
            <input
              type="number"
              placeholder="0345678923"
              onChange={(e) => handleChangeInput(e, "phone")}
              value={inputValue.phone}
              className="p-2 bg-border-color"
            />
            <div className="flex items-center gap-6 mt-2">
              <div>
                <input type="checkbox" className="mr-2" />
                <label>Nam</label>
              </div>
              <div>
                <input type="checkbox" className="mr-2" />
                <label>Nữ</label>
              </div>
              <div>
                <input type="checkbox" className="mr-2" />
                <label>Khác</label>
              </div>
            </div>
          </div>
        </div>
        <button
          className="p-2 bg-primary-color text-white rounded-sm my-5"
          onClick={handleUpdateUser}
        >
          Thay đổi
        </button>
      </div>
    </div>
  );
}

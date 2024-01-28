import { NavLink } from "react-router-dom";
import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';

import { login } from "../../store/userSlice";
import { uploadCloudinary } from "../../api/upload";
import { requests } from "../../api/service";


export default function Profile({ imageUrl, accountName }) {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(imageUrl ?? null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const res = await uploadCloudinary(file);
    let picture = {
      url: res.url,
      public_id: res.public_id,
    };
    setPhoto(picture.url);
    if(picture) {
      const response = await requests.updateAvatar(picture);
      if(response.data.message === 'ok') {
        console.log(response.data);
        dispatch(login(response.data));
      }
    }
  };

  return (
    <div className="bg-white w-[35%] px-5 pt-3 pb-48 rounded-md">
      <div className="flex items-center mb-4">
        <div className="relative w-[100px] h-[100px] rounded-full">
          <img
            src={photo ?? "/images/user.jpg"}
            alt="user"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute right-[-6px] top-[-2px] cursor-pointer">
            <i className="fa-solid fa-camera text-[24px]"></i>
            <input
              type="file"
              onChange={handleUpload}
              className="absolute top-0 left-0 right-0 bottom-0 opacity-0"
            />
          </div>
        </div>
        <h3 className="font-semibold text-[19px] ml-3 flex-1">{accountName}</h3>
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

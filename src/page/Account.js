import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';

import { requests } from "../api/service";
import { login } from "../store/userSlice";
import MainLayout from "../layout/Main";
import Profile from "../components/account/Profile";
import DetailProfile from "../components/account/DetailProfile";
import handleToast from "../util/toast";

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userCurr);

  if (!user) {
    navigate("/login");
  }
  
  
  const [inputValue, setInputValue] = useState({
    accountName: user?.accountName ?? user.username,
    fullname: user.username ? user.username : "",
    phone: user.phoneNumber ? user.phoneNumber : "",
    email: user.email ?? "",
    gender: user.gender ? user.gender : "",
    address: user.address ?? "",
  });

  const onSave = async () => {
      const res = await requests.updateUser(inputValue);
      if (res.message === "ok") {
        dispatch(login(res));
        handleToast(toast.success, "Lưu thành công!");
      } else {
        handleToast(toast.warn, "Kiểm tra lại nhé");
      }
  };

  return (
    <MainLayout>
      <div className="w-full flex gap-8 pb-16 rounded-t-xl">
        <Profile
          imageUrl={user?.picture?.url}
          accountName={inputValue?.accountName}
        />
        <DetailProfile
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSave={onSave}
        />
      </div>
    </MainLayout>
  );
}

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.auth.userCurr);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [quantity, setQuantity] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (currUser && currUser.cart?.length > 0) {
      setQuantity(currUser.cart.reduce((a, b) => a + b.quantity, 0));
    } else {
      setQuantity(null);
    }
  }, [currUser]);

  return (
    <div className="w-full h-[120px] bg-gradient-to-b from-primary-color to-[#fe6232] text-[white]">
      <div className="w-[1200px] m-auto flex justify-between items-center">
        <div className="my-1 flex gap-4">
          <span className="cursor-pointer download-app relative hover:opacity-80">
            Tải ứng dụng
          </span>
          <div className="hidden code-QR absolute bg-[white] p-2 top-[32px] shadow-md rounded-sm z-50">
            <img src="/logo/QR.jpg" alt="QR" className="h-[160px]" />
            <span className="text-[#333] text-[18px] text-center font-semibold">
              Tim Gi The
            </span>
          </div>
          <span className="cursor-pointer hover:opacity-80">
            Kết nối <i className="fa-brands fa-facebook"></i>{" "}
            <i className="fa-brands fa-instagram"></i>
          </span>
        </div>
        <div className="my-1 flex gap-5">
          <span className="cursor-pointer hover:opacity-80">
            <i className="fa-solid fa-bell"></i> Thông báo
          </span>
          <span className="cursor-pointer hover:opacity-80">
            <i className="fa-solid fa-circle-info"></i> Hỗ trợ
          </span>
          {isLogin ? (
            <span className="hover:opacity-80 cursor-pointer">
              <i className="fa-solid fa-user"></i> {currUser.username}
            </span>
          ) : (
            <span
              className="cursor-pointer hover:opacity-80"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </span>
          )}

          {isLogin ? (
            <span
              className="hover:opacity-80 cursor-pointer"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </span>
          ) : (
            <span
              className="cursor-pointer hover:opacity-80"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </span>
          )}
        </div>
      </div>
      <div className="w-[1200px] m-auto flex justify-between items-center">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src="/logo/book_logo.png" className="h-20" alt="logo" />
        </div>
        <div className="w-[800px] h-12 leading-8 flex justify-between items-center bg-[white] p-2 rounded-md">
          <input
            name="search"
            type="text"
            className="flex-1 mr-2 text-[#333] outline-none"
            placeholder="Tìm book & author"
          />
          <button className="bg-primary-color px-6 py-1 rounded-sm text-center">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div
          className="text-3xl cursor-pointer relative"
          onClick={() => navigate("/order")}
        >
          <i className="fa-solid fa-cart-shopping mr-[5px]"></i>
          {quantity && quantity > 0 && (
            <span className="py-[5px] px-[8px] top-[-12px] left-[25px] leading-none bg-[#fff] text-primary-color font-semibold rounded-full absolute text-[14px]">
              {quantity}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

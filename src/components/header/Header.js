import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.auth.userCurr);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const handleLogout = () => {
    dispatch(logout());
  };

  console.log(currUser, isLogin);

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
          {currUser ? (
            <span className="hover:opacity-80 cursor-pointer">
              <i className="fa-solid fa-user"></i> {currUser.name}
            </span>
          ) : (
            <span
              className="cursor-pointer hover:opacity-80"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </span>
          )}

          {currUser ? (
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
        <div className="text-3xl cursor-pointer">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;

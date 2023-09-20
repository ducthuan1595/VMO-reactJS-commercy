import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.auth.userCurr);

  console.log({ currUser });

  return (
    <div className="w-full h-[120px] bg-gradient-to-b from-primary-color to-[#fe6232] text-[white]">
      <div className="w-[1200px] m-auto flex justify-between items-center">
        <div className="my-1 flex gap-4">
          <span className="cursor-pointer">Tải ứng dụng</span>
          <div>
            <img src="" alt="QR" />
          </div>
          <span className="cursor-pointer">
            Kết nối <i className="fa-brands fa-facebook"></i>{" "}
            <i className="fa-brands fa-instagram"></i>
          </span>
        </div>
        <div className="my-1 flex gap-4">
          <span className="cursor-pointer">
            <i className="fa-solid fa-bell"></i> Thông báo
          </span>
          <span className="cursor-pointer">
            <i className="fa-solid fa-circle-info"></i> Hỗ trợ
          </span>
          {currUser.length ? (
            <span>User</span>
          ) : (
            <span
              className="cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </span>
          )}

          {currUser.length ? (
            <span>Logout</span>
          ) : (
            <span className="cursor-pointer" onClick={() => navigate("/login")}>
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

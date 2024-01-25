import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { useEffect, useState } from "react";

import { requests } from "../../api/service";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.auth.userCurr);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [quantity, setQuantity] = useState(null);
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [itemSearch, setItemSearch] = useState(null);


  useEffect(() => {
    if (currUser && currUser.cart?.length > 0) {
      setQuantity(currUser.cart.reduce((a, b) => a + b.quantity, 0));
    } else {
      setQuantity(null);
    }
  }, [currUser]);

  const handleSearch = async () => {
    if (search) {
      const key = search.trim();
      try {
        const res = await requests.getItem(
          null,
          key,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        );
        if (res.data.message === "ok") {
          setItemSearch(res.data.data);
          setOpenSearch(!openSearch);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleShowDetail = (id) => {
    const item = itemSearch.find((i) => i._id.toString() === id.toString());
    if (item) {
      navigate(`/detail-item/${id}`, {
        state: {
          detailItem: item,
        },
      });
      setOpenSearch(false);
      setSearch("");
    }
  };

  const handleSearchWithEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // console.log(itemSearch);

  return (
    <div className="w-full h-[120px] bg-gradient-to-b from-primary-color to-[#fe6232] text-[white]">
      <div className="hidden lg:flex max-w-[1200px] m-auto justify-between items-center">
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
          {isLogin && currUser ? (
            <div className="group relative">
              <span className="hover:opacity-80 cursor-pointer">
                <i className="fa-solid fa-user"></i>{" "}
                {currUser.accountName
                  ? currUser.accountName
                  : currUser.username}
              </span>
              <div className="group-hover:block transition duration-75 ease-in delay-150 absolute hidden z-20 right-0 top-[30px] create-before-stage bg-white p-4 text-[#333] w-[160px] rounded-md hover:delay-300">
                <ul>
                  <li
                    className="cursor-pointer hover:text-primary-color"
                    onClick={() => {
                      navigate("/account");
                    }}
                  >
                    Tài khoản
                  </li>
                  <li
                    className="my-2 cursor-pointer hover:text-primary-color"
                    onClick={() => navigate("/purchase")}
                  >
                    Đơn mua
                  </li>
                  <li
                    className="cursor-pointer hover:text-primary-color"
                    onClick={() => {
                      dispatch(logout());
                      navigate("/");
                    }}
                  >
                    Đăng xuất
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <span
              className="cursor-pointer hover:opacity-80"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </span>
          )}

          {!isLogin && !currUser && (
            <span
              className="cursor-pointer hover:opacity-80"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </span>
          )}
        </div>
      </div>
      <div className="max-w-[1200px] m-auto flex justify-between items-center">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src="/logo/book_logo.png" className="h-20" alt="logo" />
        </div>
        <div className="w-[100px] md:w-[400px] lg:w-[800px] relative h-12 leading-8 flex justify-between items-center bg-[white] p-2 rounded-md">
          <input
            name="search"
            type="text"
            className="flex-1 mr-2 text-[#333] outline-none pl-3"
            placeholder="Tìm book & author"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => handleSearchWithEnter(e)}
            value={search}
          />
          <button
            onClick={handleSearch}
            className="bg-primary-color px-6 py-1 hover:opacity-80 rounded-sm text-center"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {openSearch && (
            <div className="absolute top-[52px] rounded-md left-0 right-0 h-[320px] overflow-auto bg-white z-30 p-4">
              {itemSearch.length ? (
                itemSearch.map((i) => {
                  return (
                    <div
                      key={i._id}
                      className="text-[#888383] cursor-pointer hover:bg-border-color p-1"
                      onClick={handleShowDetail.bind(null, i._id)}
                    >
                      <span>{i.name}</span>
                    </div>
                  );
                })
              ) : (
                <div className="text-[#888383] cursor-pointer text-center hover:bg-border-color p-1">
                  Hiện tại chúng tôi chưa có sản phẩm này.
                </div>
              )}
            </div>
          )}
        </div>
        <div
          className="text-3xl cursor-pointer relative shake-bottom "
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

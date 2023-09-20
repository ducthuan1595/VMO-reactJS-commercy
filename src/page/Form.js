import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { requests } from "../api/service";
import { login } from "../store/userSlice";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleLogin = async () => {
    if (location.pathname === "/register") {
      if (!name || !email || !password) {
        setErrMessage("These fields are required!");
      } else {
        setErrMessage("");
        const res = await requests.register({
          username: name,
          email,
          password,
        });
        if (res.data.message === "ok") {
          navigate("/login");
        } else {
          setErrMessage(res.data.message);
        }
      }
    } else {
      if (!email || !password) {
        setErrMessage("These fields are required!");
      } else {
        setErrMessage("");
        const res = await requests.login({ email, password });
        if (res.data.message === "ok") {
          dispatch(login(res.data.data));
          navigate("/");
        } else {
          setErrMessage(res.data.message);
        }
      }
    }
  };

  const handleLoginWithEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="md:self-end lg:self-end">
        <img src="/logo/book_logo.png" alt="logo" className="h-[240px]" />
      </div>
      <div className="h-full mt-[100px] flex justify-center items-center">
        <div className="flex justify-center items-center h-[560px] w-[400px] rounded-[15px] bg-gradient-to-r from-primary-color to-orange-500">
          <div className="bg-[white] rounded-[15px] w-[360px]">
            {/* <form> */}
            <h2 className="text-center text-2xl font-semibold mt-[42px] mx-0 mb-[26px]">
              {location.pathname === "/register" ? "Register" : "Login"}
            </h2>
            <div className="text-center my-0 mx-[12px] relative">
              {location.pathname === "/register" ? (
                <div className="flex flex-col justify-between items-center py-1">
                  <label className="text-left w-full">Name</label>
                  <input
                    className="text-left block w-full p-1 border-solid border-[1px] border-[#ced4da] rounded-sm"
                    value={name}
                    onKeyDown={(e) => handleLoginWithEnter(e)}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    type="text"
                  />
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col justify-between items-center py-1">
                <label className="w-full text-left">Email</label>
                <input
                  className="text-left block w-full p-1 border-solid border-[1px] border-[#ced4da] rounded-sm"
                  value={email}
                  onKeyDown={(e) => handleLoginWithEnter(e)}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div className="relative flex flex-col justify-between items-center py-1">
                <label className="w-full text-left">Password</label>
                <input
                  className="text-left block w-full p-1 border-solid border-[1px] border-[#ced4da] rounded-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleLoginWithEnter(e)}
                  placeholder="Enter your password"
                  type={isShowPassword ? "text" : "password"}
                />
                <span onClick={() => setIsShowPassword(!isShowPassword)}>
                  <i
                    className={
                      isShowPassword
                        ? "fas fa-eye eye-password"
                        : "far fa-eye-slash eye-password"
                    }
                    style={{ position: "absolute", right: "15px", top: "36px" }}
                  ></i>
                </span>
              </div>
              <div className="col-12 text-[12px] text-primary-color w-full text-left absolute mt-1">
                {errMessage}
              </div>
              <div>
                <button
                  className="w-full bg-primary-color text-[white] py-2 mt-6 mb-3 rounded-lg"
                  onClick={handleLogin}
                >
                  {location.pathname === "/register" ? "Register" : "Login"}
                </button>
              </div>
              {location.pathname === "/login" ? (
                <div className="text-left mb-2 cursor-pointer">
                  <p onClick={() => navigate("/forgot-password")}>
                    Forget your password?
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="block text-center">
              <p>Or login with</p>
              <div className="flex justify-center mb-[40px]">
                <div>
                  <i
                    className="fab fa-google-plus social-google"
                    style={{
                      color: "#e1461f",
                      fontSize: "32px",
                      marginRight: "10px",
                    }}
                  ></i>
                </div>
                <div>
                  <i
                    className="fab fa-facebook social-facebook"
                    style={{ fontSize: "32px", color: "#1741d9" }}
                  ></i>
                </div>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

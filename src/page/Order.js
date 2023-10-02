import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layout/Main";
import PayOrder from "../components/body/PayOrder";
import { URL } from "../api/service";
import { requests } from "../api/service";
import { addCart } from "../store/userSlice";

export default function Order() {
  const token = useSelector((state) => state.auth.token);
  const currUser = useSelector((state) => state.auth.userCurr);
  const dispatch = useDispatch();

  const [checkCartArrId, setCheckCartArrId] = useState([]);

  const handleDecrease = (id, quantity, pricePay, idCart) => {
    if (quantity > 1) {
      const updateCart = checkCartArrId.map((i) => {
        if (i.id === idCart) {
          i.price -= pricePay;
        }
        return i;
      });
      setCheckCartArrId(updateCart);
      handleAddCart(id, -1);
    }
  };
  const handleIncrease = (id, quantity, pricePay, idCart) => {
    const updateCart = checkCartArrId.map((i) => {
      if (i.id.toString() === idCart.toString()) {
        i.price += pricePay;
      }
      return i;
    });
    setCheckCartArrId(updateCart);
    handleAddCart(id, 1);
  };

  const handleAddCart = async (id, quantity) => {
    if (currUser && token) {
      try {
        const value = {
          quantity,
          itemId: id,
        };
        const res = await requests.addCart(value, token);
        if (res.data.message === "ok") {
          dispatch(addCart(res.data.data));
        }
        return true;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteCart = async (id) => {
    if (token) {
      const isConfirm = window.confirm("Muốn xóa thật không?");
      if (isConfirm) {
        const res = await requests.deleteCart({ cartId: id }, token);
        if (res.data.message === "ok") {
          dispatch(addCart(res.data.data));
        }
      }
    }
  };

  const handleCheckCart = (e, id, totalPrice) => {
    if (e.target.checked) {
      setCheckCartArrId([...checkCartArrId, { id, price: totalPrice }]);
    } else {
      setCheckCartArrId(checkCartArrId.filter((c) => c.id !== id));
    }
  };

  // console.log({ checkCartArrId });
  return (
    <MainLayout>
      <div className="text-[22px] font-semibold w-full bg-white p-5 rounded.md text-primary-color">
        <i class="fa-solid fa-cart-arrow-down mr-2"></i>
        GIỎ HÀNG
      </div>
      <div className="border-[1px] border-solid bg-[#fffef4] border-[#fbe104] p-2 rounded-md my-4 bg-[white] w-full">
        Nhớ nhấn vào mã giảm giá bên dưới để nhận thêm khuyến mãi nhé!
      </div>
      <div className="bg-[white] p-8 w-full rounded-md mb-4">
        <table className="w-full">
          <thead>
            <tr className="">
              <th className="text-center">
                <i className="fa-regular fa-square"></i>
              </th>
              <th>Sản Phẩm</th>
              <th>Đơn Giá</th>
              <th>Số Lượng</th>
              <th>Số Tiền</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currUser &&
              currUser.cart.map((i) => {
                const totalPrice = Math.floor(i.itemId.pricePay * i.quantity);
                return (
                  <tr key={i._id} className="text-center">
                    <td>
                      <input
                        type="checkbox"
                        className="h-[15px] w-[15px]"
                        onChange={(e) => handleCheckCart(e, i._id, totalPrice)}
                      />
                    </td>
                    <td className="flex w-[240px]">
                      <img
                        src={`${URL}/image/${i.itemId.pic[0]}`}
                        alt={i.itemId.name}
                        className="h-[120px] my-4 ml-8"
                      />
                      <span className="mt-4 ml-2">{i.itemId.name}</span>
                    </td>
                    <td>
                      {Math.floor(i.itemId.pricePay)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      đ
                    </td>
                    <td>
                      <div className="flex items-center justify-center bg-[white] rounded-md ml-4">
                        <button
                          className="py-1 px-4 hover:bg-border-color border-[1px] border-solid border-border-color"
                          onClick={handleDecrease.bind(
                            null,
                            i.itemId._id,
                            i.quantity,
                            i.itemId.pricePay,
                            i._id
                          )}
                        >
                          -
                        </button>
                        <span className="py-1 px-4 border-[1px] border-solid border-border-color">
                          {i.quantity}
                        </span>
                        <button
                          className="py-1 px-4 border-[1px] border-solid border-border-color hover:bg-border-color"
                          onClick={() =>
                            handleIncrease(
                              i.itemId._id,
                              i.quantity,
                              i.itemId.pricePay,
                              i._id
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      {Math.floor(i.itemId.pricePay * i.quantity)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      đ
                    </td>
                    <td className="text-primary-color text-center">
                      <span
                        className="cursor-pointer"
                        onClick={handleDeleteCart.bind(null, i._id)}
                      >
                        Xóa
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <PayOrder checkCartArrId={checkCartArrId} />
    </MainLayout>
  );
}

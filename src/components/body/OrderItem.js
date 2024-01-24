import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'

import { URL, requests } from "../../api/service";
import { formatTimer } from "../../util/getTimer";
import ReviewModal from "../modal/ReviewModal";
import Modal from "../modal/Modal";

export default function OrderItem({ orders, results, fetchOrder }) {
  const token = useSelector((state) => state.auth.token);
  const [isPopup, setIsPopup] = useState(false);
  const [item, setItem] = useState();
  const [reviews, setReviews] = useState([]);
  const [isEdit, setIsEdit] = useState();

  const handleAddItem = () => {
    const page = ++results.currPage;
    if (page <= +results.totalPage) {
      fetchOrder(page);
    }
  };

  useEffect(() => {
    const fetchReview = async() => {
      const res = await requests.getReview(token);
      if(res.data.message === 'ok') {
        setReviews(res.data.data);
      }
    }
    fetchReview();
  }, [token, isPopup]);

  const handleReview = (item, isEdit) => {
    setItem(item);
    setIsEdit(isEdit);
    setIsPopup(true);
  }
  if(isPopup && item) {
    return (
      <>
        <Modal setOpen={setIsPopup} />
        <ReviewModal item={item} setIsPopup={setIsPopup} isEdit={isEdit} />
      </>
    );
  }


  return (
    <div className="w-full rounded-md">
      <table className="w-full">
        <thead className="bg-white h-[80px]">
          <tr className="">
            <th>Sản Phẩm</th>
            <th>Đơn Giá</th>
            <th>Số Lượng</th>
            <th>Đánh giá</th>
          </tr>
        </thead>
        <tbody className="">
          {orders &&
            orders.map((i) => {
              const status = {
                D0: "Đang giao",
                D1: "Hoàn thành",
                D2: "Đã hủy",
              };
              let currStatus = status[i.status];
              let textColor;
              if (i.status === "D0") textColor = "#da33caf2";
              if (i.status === "D1") textColor = "#2acd2abd";
              if (i.status === "D2") textColor = "red";
              return (
                <React.Fragment key={i._id}>
                  <tr className="text-center">
                    <td colSpan={4}>
                      <div className="flex justify-around mt-8 mb-2 font-medium text-[16px]">
                        <span>
                          Đặt hàng từ ngày:{" "}
                          {formatTimer(new Date(i.createdAt), null, true)}
                        </span>
                        <span>Tổng số lượng: {i.quantity}</span>
                        <span>
                          Tổng tiền:{" "}
                          <span className="text-primary-color">
                            {i.amount
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            đ
                          </span>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr key={i._id} className="bg-white">
                    <td className="w-[240px] text-start">
                      {i.items.map((item) => {
                        return (
                          <div key={item._id} className="flex w-[400px]">
                            <img
                              src={item.itemId.pic[0].url}
                              alt={item.itemId.name}
                              className="h-[120px] w-[120px] my-4 ml-4 object-contain"
                            />
                            <span className="mt-4 ml-4">
                              {item.itemId.name}
                            </span>
                          </div>
                        );
                      })}
                    </td>
                    <td className="h-full flex flex-col justify-center items-center text-center">
                      {i.items.map((item) => {
                        return (
                          <div key={item._id} className="pt-[4rem] pb-[5rem]">
                            {Math.floor(item.itemId.pricePay * item.quantity)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            đ
                          </div>
                        );
                      })}
                    </td>

                    <td className="text-center">
                      {i.items.map((item) => {
                        return (
                          <div key={item._id} className="pt-[3rem] pb-[6rem]">
                            {item.quantity}
                          </div>
                        );
                      })}
                    </td>
                    <td className="h-full flex flex-col justify-center items-center text-center">
                      {i.items.map((item) => {
                        let isItem = reviews.find(v => v.itemId == item.itemId._id);
                      return (
                        <div key={item._id} className="pt-[3rem] pb-[5rem]">
                          <button
                            onClick={() => handleReview(item.itemId, isItem)}
                            className="p-2 rounded-md text-white t-box-shadow"
                            style={{
                              backgroundColor: isItem ? "#f2ca59" : "#f9512f",
                            }}
                          >
                            {isItem ? "Sửa đánh giá" : "Chưa đánh giá"}
                          </button>
                        </div>
                      );})}
                    </td>
                  </tr>
                  <tr className="bg-white w-full">
                    <td colSpan={4}>
                      <div className="w-full flex items-center gap-12 my-4 ml-8">
                        <button className="border-[2px] border-solid border-border-color p-2 rounded-md">
                          Mua lại
                        </button>

                        <div style={{ color: `${textColor}` }}>{currStatus}</div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
      {results?.currPage == results?.totalPage ? (
        ""
      ) : (
        <div className="bg-white p-6">
          <button
            onClick={handleAddItem}
            className="text-[white] bg-gradient-to-b from-primary-color to-[#fe6232] py-2 px-12 rounded-xl mx-auto block"
          >
            {results?.currPage == results?.totalPage ? "Het rui" : "Xem thêm"}
          </button>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";

import { requests } from "../../api/service";
import Item from "../Item";

export default function ListItem({ fetchItem, pageItem, limit }) {
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (pageItem && pageItem.products) {
      setItems((items) => items.concat(pageItem.products));
    }
  }, [pageItem]);

   useEffect(() => {
     const fetchReview = async () => {
       const res = await requests.getAllReview();
       if (res.data.message === "ok") {
         setReviews(res.data.data);
       }
     };
     fetchReview();
   }, []);

  const handleAddItem = () => {
    if (pageItem && pageItem.totalPage && pageItem.currPage) {
      const page = ++pageItem.currPage;
      if (page <= pageItem.totalPage) {
        fetchItem(page);
      }
    }
  };
  return (
    <div className="bg-[white] pb-6">
      <div className="p-4">
        <i className="fa-solid fa-fire text-pink-500 text-[24px]"></i>
        <span className="text-[22px] text-center ml-2 font-semibold">
          Xu hướng mua sản phẩm
        </span>
        <div className="border-[1px] border-solid border-border-color mt-4"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-4 pb-4 px-2">
        {items &&
          items.map((i) => {
            const reviewItem = reviews.filter(review => review.itemId === i._id)
            return (
              <Item
                pic={i.pic}
                name={i.name}
                pricePay={i.pricePay}
                priceOrigin={i.priceInput}
                percent={i.flashSaleId?.discount_percent}
                page={i.weight}
                isBorder={true}
                id={i._id}
                key={i._id}
                reviewItems={reviewItem}
              />
            );
          })}
      </div>
      {pageItem?.currPage == pageItem?.totalPage ? (
        ""
      ) : (
        <div>
          <button
            onClick={handleAddItem}
            className="text-[white] bg-gradient-to-b from-primary-color to-[#fe6232] py-2 px-12 rounded-xl mx-auto block"
          >
            {pageItem?.currPage == pageItem?.totalPage ? "Het rui" : "Xem thêm"}
          </button>
        </div>
      )}
    </div>
  );
}

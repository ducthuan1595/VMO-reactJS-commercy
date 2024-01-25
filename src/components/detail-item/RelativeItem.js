import { useEffect, useState } from "react";
import Item from "../Item";

import { requests } from "../../api/service";

export default function RelativeItem({ detailItem }) {
  const [item, setItem] = useState([]);
  const [pageItem, setPageItem] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchItem = async (page) => {
    const limit = 5;
    if (detailItem) {
      const res = await requests.getItem(
        detailItem.categoryId.name,
        null,
        null,
        page,
        limit,
        null,
        null,
        null,
        null
      );

      if (res.data.message === "ok") {
        // setItem(res.data.data);
        setPageItem(res.data.data);
      }
    }
  };
  useEffect(() => {
    fetchItem(1);
  }, [detailItem]);

  useEffect(() => {
    if (pageItem && pageItem.products) {
      setItem((items) => items.concat(pageItem.products));
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
    <div className="bg-[white] p-4 rounded-md">
      <div className="text-[22px] font-semibold mb-4">SẢN PHẨM LIÊN QUAN</div>
      <div className="grid grid-cols-5 gap-y-4 pb-4 px-2">
        {item &&
          item.map((i) => {
            const reviewItem = reviews.filter(
              (review) => review.itemId === i._id
            );
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
                setItem={setItem}
                item={item}
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
      {/* {item?.totalPage && item.totalPage > 1 && (
        <div className="flex gap-4 mt-4 mb-8 justify-between items-center text-primary-color">
          {item?.prevPage ? (
            <span
              className="cursor-pointer border-[1px] py-2 rounded-lg border-primary-color w-[45%] justify-self-start"
              onClick={handlePrevPage}
            >
              <div className="pl-[20px]">
                <i className="fa-solid fa-chevron-left text-primary-color"></i>{" "}
                Prev
              </div>
            </span>
          ) : (
            <span className="w-[45%]"></span>
          )}
          <span className="text-primary-color">
            {item.currPage}/{item.totalPage}
          </span>
          {item?.nextPage ? (
            <span
              className="cursor-pointer border-[1px] py-2 rounded-lg border-primary-color w-[45%] text-right justify-items-end"
              onClick={handleNextPage}
            >
              <div className="pr-[20px]">
                Next{" "}
                <i className="fa-solid fa-chevron-right text-primary-color"></i>
              </div>
            </span>
          ) : (
            <span className="w-[45%]"></span>
          )}
        </div>
      )} */}
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";

import { getReviewFollowItem } from "../../actions/getReviews"

import Star from '../Star';
import Reviewer from '../Reviewer';
import Navigation from "../Navigation";
import { getPercentStar } from "../../util/getPercent";

const Review = ({itemId}) => {
  const [reviews, setReview] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const totalRef = useRef(null);

  useEffect(() => {
    if(itemId) {
      const fetchReview = async () => {
        let limit = 5;
        const res = await getReviewFollowItem(itemId, page, limit);
        console.log(res);
        setReview(res.data);
        setTotalPage(res.totalPage);
      };
      fetchReview();
    }
  }, [page, itemId]);

  useEffect(() => {
    if(totalRef.current) {
      const percent = getPercentStar(reviews);
      const point = percent / 100 * 5;
      totalRef.current.innerHTML = point.toFixed(1);
    }
  }, [totalRef, reviews])

  if(reviews.length < 1) {
    return (
      <div className="bg-white rounded px-4 py-6">
        <h1 className="text-2xl font-medium">Đánh giá sản phẩm</h1>
        <div className="text-center py-5">Chưa có đánh giá</div>
      </div>
    );
  }

  
  return (
    <div className="bg-white rounded px-4 py-6">
      <h1 className="text-2xl font-medium">Đánh giá sản phẩm</h1>
      <div className="flex flex-col md:flex-row justify-evenly bg-orange-100 p-6 mt-4 rounded">
        <div className="flex gap-5">
          <div>
            <button className="px-4 py-1 bg-white border-2 border-red-300">
              Tất cả
            </button>
          </div>
          <div>
            <button className="px-4 py-1 bg-white">5 Sao</button>
          </div>
          <div>
            <button className="px-4 py-1 bg-white">4 Sao</button>
          </div>
          <div>
            <button className="px-4 py-1 bg-white">3 Sao</button>
          </div>
          <div>
            <button className="px-4 py-1 bg-white">2 Sao</button>
          </div>
          <div>
            <button className="px-4 py-1 bg-white">1 Sao</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star isBig={true} reviewItems={reviews} />
          <span className="text-3xl text-red-500" ref={totalRef} >5.0</span>
        </div>
      </div>
      <div>
        {reviews.map((review) => (
          <Reviewer review={review} key={review._id} />
        ))}
      </div>
      <Navigation totalPage={totalPage} setPage={setPage} />
    </div>
  );
};

export default Review;
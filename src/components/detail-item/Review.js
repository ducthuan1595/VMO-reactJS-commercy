import { useEffect, useState } from "react";
import { getReviews } from "../../actions/getReviews"

import Star from '../Star';
import Reviewer from '../Reviewer';

const Review = () => {
  const [reviews, setReview] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      const res = await getReviews();
      setReview(res);
    };
    fetchReview();
  }, []);
  
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
          <Star isBig={true} />
          <span className="text-3xl text-red-500">5.0</span>
        </div>
      </div>
      <div>
        {reviews.map(review => (
          <Reviewer review={review} key={review._id} />
        ))}
      </div>
    </div>
  );
};

export default Review;
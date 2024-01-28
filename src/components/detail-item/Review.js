import { useCallback, useEffect, useRef, useState } from "react";

import { getReviewFollowItem } from "../../actions/getReviews"

import Star from '../Star';
import Reviewer from '../Reviewer';
import Navigation from "../Navigation";
import { getPercentStar } from "../../util/getPercent";

const Review = ({itemId}) => {
  const [reviews, setReview] = useState([]);
  const [allReview, setAllReview] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [rateStar, setRateStar] = useState('all');
  const [totalByStar, setTotalByStar] = useState({
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
    '1': 0
  })

  const totalRef = useRef(null);

  useEffect(() => {
    if (itemId) {
      const fetchReview = async () => {
        const res = await getReviewFollowItem(itemId);
        setAllReview(res);
    
        const cpState = { ...totalByStar };
        cpState[5] = 0;
        cpState[4] = 0;
        cpState[3] = 0;
        cpState[2] = 0;
        cpState[1] = 0;
        res.forEach((item) => {
          if (item.stars > 80) {
            cpState[5]++;
          }
          if (item.stars <= 80 && item.stars > 60) {
            cpState[4]++;
          }
          if (item.stars > 40 && item.stars <= 60) {
            cpState[3]++;
          }
          if (item.stars > 20 && item.stars <= 40) {
            cpState[2]++;
          }
          if (item.stars <= 20) {
            cpState[1]++;
          }
        });
        setTotalByStar(cpState);
      };
      fetchReview();
    }
  }, [itemId]);

  useEffect(() => {
    if (itemId) {
      const fetchReview = async () => {
        let limit = 5;
        const res = await getReviewFollowItem(itemId, rateStar, page, limit);
        setReview(res.data);
        setTotalPage(res.totalPage);
      };
      fetchReview();
    }
  }, [page, itemId, rateStar]);

  useEffect(() => {
    if (totalRef.current) {
      const percent = getPercentStar(allReview);
      const point = (percent / 100) * 5;
      totalRef.current.innerHTML = !isNaN(point) ? point.toFixed(1) : "0.0";
    }
  }, [totalRef, allReview]);


  return (
    <div className="bg-white rounded px-4 py-6">
      <h1 className="text-2xl font-medium">Đánh giá sản phẩm</h1>
      <div className="flex flex-col md:flex-row justify-evenly bg-orange-100 p-6 mt-4 rounded">
        <div className="flex gap-5">
          <div>
            <button
              className="px-4 py-1 bg-white border-2"
              style={{
                borderColor: rateStar == "all" ? "#fca5a5" : "#fff",
                color: rateStar == "all" ? "#fca5a5" : "#333",
              }}
              onClick={() => setRateStar("all")}
            >
              Tất cả ({allReview.length})
            </button>
          </div>
          <div>
            <button
              className="px-4 py-1 bg-white border-2"
              style={{
                borderColor: rateStar == "5" ? "#fca5a5" : "#fff",
                color: rateStar == "5" ? "#fca5a5" : "#333",
              }}
              onClick={() => setRateStar("5")}
            >
              5 Sao ({totalByStar[5]})
            </button>
          </div>
          <div>
            <button
              className="px-4 py-1 bg-white border-2"
              style={{
                borderColor: rateStar == "4" ? "#fca5a5" : "#fff",
                color: rateStar == "4" ? "#fca5a5" : "#333",
              }}
              onClick={() => setRateStar("4")}
            >
              4 Sao ({totalByStar[4]})
            </button>
          </div>
          <div>
            <button
              className="px-4 py-1 bg-white border-2"
              style={{
                borderColor: rateStar == "3" ? "#fca5a5" : "#fff",
                color: rateStar == "3" ? "#fca5a5" : "#333",
              }}
              onClick={() => setRateStar("3")}
            >
              3 Sao ({totalByStar[3]})
            </button>
          </div>
          <div>
            <button
              className="px-4 py-1 bg-white border-2"
              style={{
                borderColor: rateStar == "2" ? "#fca5a5" : "#fff",
                color: rateStar == "2" ? "#fca5a5" : "#333",
              }}
              onClick={() => setRateStar("2")}
            >
              2 Sao ({totalByStar[2]})
            </button>
          </div>
          <div>
            <button
              className="px-4 py-1 bg-white border-2"
              style={{
                borderColor: rateStar == "1" ? "#fca5a5" : "#fff",
                color: rateStar == "1" ? "#fca5a5" : "#333",
              }}
              onClick={() => setRateStar("1")}
            >
              1 Sao ({totalByStar[1]})
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star isBig={true} reviews={allReview} />
          <span className="text-3xl text-red-500" ref={totalRef}>
            5.0
          </span>
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
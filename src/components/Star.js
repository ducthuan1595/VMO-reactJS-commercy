import {useEffect, useRef} from 'react';
import { getPercentStar } from '../util/getPercent';

const Star = ({reviews, review, isBig}) => {
  const divEl = useRef();

  useEffect(() => {
    if(review) {
      divEl.current.style.width = review.stars + "%";
    }else if(reviews?.length) {
      const reviewsArr = reviews ?? [];
      const percent = getPercentStar(reviewsArr);
      divEl.current.style.width = percent + "%";
    }
  }, [reviews, review]);

  return (
    <>
      <div className={isBig ? "review-body__stars--big" : "review-body__stars"}>
        <div
          className={
            isBig ? "review-body__stars-inner--big" : "review-body__stars-inner"
          }
          ref={divEl}
        ></div>
      </div>
    </>
  );
};

export default Star;
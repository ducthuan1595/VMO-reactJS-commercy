import {useEffect, useRef} from 'react';
import { getPercentStar } from '../util/getPercent';

const Star = ({reviewItems, isBig}) => {
  const divEl = useRef();

  useEffect(() => {
    const reviews = reviewItems ?? [];
    const percent = getPercentStar(reviews);
    divEl.current.style.width = percent + "%";
  }, [reviewItems]);

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
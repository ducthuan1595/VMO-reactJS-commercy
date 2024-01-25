import {useEffect, useRef} from 'react';

const Star = ({reviewItems, isBig}) => {
  const divEl = useRef();

  useEffect(() => {
    const reviews = reviewItems ?? [];
    const stars = reviews
      .map((review) => review.stars)
      .reduce((a, b) => a + b, 0);
    const percent = Math.ceil(stars / reviews.length);
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
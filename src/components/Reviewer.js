import Avatar from './Avatar';
import { formatTimer } from '../util/getTimer';

const Reviewer = ({review}) => {

  console.log(review.picture[0]);
  return (
    <div className="flex flex-col gap-2 px-5 border-b-[1px] py-4 text-left border-stone-200">
      <div className="flex flex-col items-start">
        <Avatar user={review.reviewer} isStar={true} />
        <div className="text-neutral-500 text-xs mx-10">
          {formatTimer(review.createdAt, true, true)}
        </div>
      </div>
      <div className="ml-10">{review.comment}</div>
      <div className="flex items-center gap-1 mx-10">
        {review.picture &&
          review.picture.map((pic) => (
            <div key={pic._id} className="border border-neutral-200 p-1 rounded-md">
              <img src={pic.url} alt="review" className="h-16" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reviewer;
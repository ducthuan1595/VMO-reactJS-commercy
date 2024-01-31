import Star from "./Star";

const Avatar = ({isStar, review}) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="h-[40px] w-[40px] rounded-full">
        <img
          src={review?.reviewer.picture?.url ?? "/images/user.jpg"}
          alt="user"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center items-start">
        <h3 className="font-normal text-[12px] leading-[15px]">
          {review?.reviewer?.accountName ?? review?.reviewer?.username}
        </h3>
        {isStar && <Star review={review} />}
      </div>
    </div>
  );
};

export default Avatar;
const Avatar = ({isStar, user}) => {

  return (
    <div className="flex justify-center items-center">
      <img
        src="/images/user.jpg"
        alt="user"
        className="w-[40px] opacity-50"
      />
      <div className="flex flex-col justify-center items-start">
        <h3 className="font-normal text-[12px] leading-[15px]">
          {user?.accountName ? user.accountName : "Account"}
        </h3>
        {isStar && (
        <div className="review-body__stars leading-[12px]">
          <div className="review-body__stars--inner"></div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
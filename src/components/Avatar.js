const Avatar = ({isStar, user}) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className='h-[40px] w-[40px] rounded-full'>
        <img
          src={user.picture?.url ?? "/images/user.jpg"}
          alt="user"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
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
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import {toast} from 'react-toastify';

import Avatar from '../Avatar';
import { requests } from '../../api/service';
import handleToast from '../../util/toast';
import UploadImage from '../inputs/UploadImage';

const ReviewModal = ({ item, setIsPopup, isEdit }) => {
  const token = useSelector((state) => state.auth.token);
  const currUser = useSelector((state) => state.auth.userCurr);
  const navigate = useNavigate();

  const divEls = useRef();
  const [comment, setComment] = useState(isEdit ? isEdit.comment : '');
  const [stars, setStars] = useState(isEdit ? isEdit.stars : 0);
  const [urlImage, setUrlImage] = useState(isEdit ? isEdit.picture : [])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    divEls.current.style.width = stars + "%";
  }, [stars]);

  if (!currUser) {
    return navigate("/login");
  }

  const handleUploadImage = (result) => {
    setUrlImage(result)
  }

  const handleSend = async () => {
    if (!token || !comment) {
      handleToast(toast.warning, 'Không được bỏ trống bình luận')
      return;
    }
    if(stars < 1) {
      handleToast(toast.warning, "Đừng quên cho sao sản phẩm nhé!");
      return;
    }
    try {
      if(isEdit) {
        const value = {
          comment,
          stars,
          picture: urlImage,
          reviewId: isEdit._id
        };
        const res = await requests.updateReview(value, token);
        if (res.data.message === "ok") {
          handleToast(toast.success, "Đã thay đổi đánh giá");
          window.scrollTo(0, 0);
          setIsPopup(false);
        }
      }else {
        const value = {
          comment,
          itemId: item._id,
          stars,
          picture: urlImage,
        };
        const res = await requests.createReview(value, token);
        if (res.data.message === "ok") {
          handleToast(toast.success, "Đã đánh giá sản phẩm");
          window.scrollTo(0,0);
          setIsPopup(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed w-full md:w-3/4 lg:w-3/6 left-[50%] right-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] p-7 bg-white z-50">
      <h1 className="text-[18px]">Đánh giá</h1>
      <span
        className="absolute right-4 top-2 p-2 cursor-pointer"
        onClick={() => setIsPopup(false)}
      >
        <i className="fa-solid fa-xmark"></i>
      </span>
      <div className="flex flex-col gap-5">
        <div className="flex">
          <img
            src={item.pic[0].url}
            alt={item.name}
            className="h-[50px] my-4 ml-4 object-contain"
          />
          <div className="flex flex-col justify-center items-start ml-2">
            <span className="">{item.name}</span>
            <p className="text-[12px] text-neutral-500">{item.author}</p>
          </div>
        </div>
        <div className="border-t-[1px] border-neutral-200"></div>
        <div className="flex justify-between items-center">
          <Avatar user={currUser} />
          <div className="review-body__stars--big ml-7 cursor-pointer">
            <input
              className="absolute right-0 left-0 opacity-0 py-[5px] z-10"
              type="range"
              min={1}
              max={100}
              step={1}
              defaultValue={0}
              onChange={(e) => setStars(e.target.value)}
            />
            <div className="review-body__stars-inner--big" ref={divEls}></div>
          </div>
        </div>
        <div>
          <UploadImage
            onChange={handleUploadImage}
            SetIsLoading={setIsLoading}
            urlImage={urlImage}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Viết đánh giá của bạn"
            className="w-full border-none outline-none ml-2"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>
        <div className="mt-8 text-right">
          <button
            disabled={isLoading}
            onClick={handleSend}
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:opacity-70"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              <>{isEdit ? "Thay đổi" : "Đánh giá"}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
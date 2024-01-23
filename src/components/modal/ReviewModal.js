import {useSelector} from 'react-redux';
import Avatar from '../Avatar';
import { useState, useRef, useEffect } from 'react';
import { requests } from '../../api/service';

const ReviewModal = ({order}) => {
  const token = useSelector((state) => state.auth.token)
  const divEls = useRef({});
  const [comments, setComments] = useState({});
  const [updateComment, setUpdateComment] = useState({});
  const [stars, setStars] = useState({});

  const handleStar = (e, id) => {
    const cpState = { ...stars };
    cpState[id] = e.target.value;
    setStars(cpState);
    const object = divEls.current;
    
    for (const key in object) {
       if (id === key) {
         object[key].style.width = e.target.value + "%"; 
       }
    }
  }

  const oninput = (e, id) => {
    const cpState = {...comments};
    cpState[id] = e.target.value;
    setComments(cpState);
  }

  const handleSend = async() => {
    if (!token || !Object.values(comments)[0] || !Object.values(stars)[0]) {
      return;
    }
    try{
      const value = {
        comment: Object.values(comments)[0],
        itemId: Object.keys(comments)[0],
        stars: Object.values(stars)[0]
      }
      const res = await requests.createReview(value, token);
      if(res.data.message === 'ok') {
        const cpState = {...updateComment};
        cpState[Object.keys(comments)[0]] = Object.values(comments)[0];
        setUpdateComment(cpState);
        setComments({});
        setStars({});
      }
    }catch(err) {
      console.error(err);
    }
  }

  console.log(updateComment);
  return (
    <div className="fixed w-full md:w-3/4 lg:w-3/6 left-[50%] right-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] p-7 bg-white z-50">
      <h1 className="text-[18px]">Đánh giá</h1>
      <div className="flex flex-col gap-5">
        {order.map((item) => (
          <div key={item._id}>
            <div key={item._id} className="flex">
              <img
                src={item.itemId.pic[0].url}
                alt={item.itemId.name}
                className="h-[50px] my-4 ml-4 object-contain"
              />
              <div className="flex flex-col justify-center items-start ml-2">
                <span className="">{item.itemId.name}</span>
                <p className="text-[12px] text-neutral-500">
                  {item.itemId.author}
                </p>
              </div>
            </div>
            <div className="border-t-[1px] border-neutral-200"></div>
            <div className="flex justify-between items-center">
              <Avatar />
              <div className="review-body__stars--big ml-7 cursor-pointer">
                <input
                  className="absolute right-0 left-0 opacity-0 py-[5px] z-10"
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  defaultValue={0}
                  onChange={(e) => handleStar(e, item._id)}
                />
                <div
                  className="review-body__stars-inner--big"
                  ref={(el) => (divEls.current[item._id] = el)}
                ></div>
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Viết đánh giá của bạn"
                className="w-full border-none outline-none ml-2"
                onChange={(e) => oninput(e, item._id)}
                value={updateComment[item._id]}
              />
            </div>
            <div className="mt-8 text-right">
              <button
                onClick={handleSend}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:opacity-70"
              >
                {updateComment[item._id] ? 'Edit' : 'Send'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewModal;
import { requests } from "../api/service";

export const getReviews = async(page, limit) => {
  try{
    const res = await requests.getAllReview(page, limit);
    if(res.data.message === 'ok') {
      return res.data.data;
    }
  }catch(err) {
    throw new Error('Wrong something!')
  }
}

export const getReviewFollowItem = async(itemId, page, limit) => {
  try{
    const res = await requests.getReviewFollowItem(itemId, page, limit);
    if (res.data.message === "ok") {
      return res.data.data;
    }
  }catch(err) {
    throw new Error('Wrong something!')
  }
}
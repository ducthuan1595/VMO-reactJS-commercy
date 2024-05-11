import { requests } from "../api/service";

export const getReviews = async(page, limit) => {
  try{
    const res = await requests.getAllReview(page, limit);
    if(res.message === 'ok') {
      return res.data;
    }
  }catch(err) {
    console.error(err);
  }
}

export const getReviewFollowItem = async(itemId, rateStar, page, limit) => {
  try{
    const res = await requests.getReviewFollowItem(itemId, rateStar, page, limit);
    if (res.message === "ok") {
      return res.data;
    }
  }catch(err) {
    console.log(err);
  }
}

export const getReviewByUser = async() => {
  try{
    const res = await requests.getReview();
    if(res.message === 'ok') {
      return res.data;
    }
  }catch(err) {
    console.log(err);
  }
}
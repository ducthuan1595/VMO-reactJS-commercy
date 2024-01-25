import { requests } from "../api/service";

export const getReviews = async() => {
  try{
    const res = await requests.getAllReview();
    if(res.data.message === 'ok') {
      return res.data.data;
    }
  }catch(err) {
    throw new Error('Wrong something!')
  }
}
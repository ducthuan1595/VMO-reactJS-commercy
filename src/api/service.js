import axios from "../config/axiosInstance";

export const requests = {
  register: (value) => {
    return axios.post(
      `/signup`,
      { ...value }
    );
  },

  login: (value) => {
    return axios.post(
      `/login`,
      { ...value }
    );
  },

  credential: (origin, value) => {
    return axios.get(
      `/v2/credential?origin=${origin}&value=${value}`
    );
  },

  loginWithFacebook: () => {
    return axios.get(`/v2/auth/facebook`);
  },

  forgotPassword: (value) => {
    return axios.post(
      `/forgot-password`,
      { ...value }
    );
  },

  updateUser: (value) => {
    return axios.post(
      `/update-user`,
      { ...value },
    );
  },

  updateAvatar: (picture) => {
    return axios.put(`/v2/avatar`,
      picture,
    )
  },

  // Voucher
  getVoucher: (page, limit) => {
    return axios.get(`/get-voucher?page=${page}&limit=${limit}`);
  },

  // Item
  getItem: (
    filter,
    searchItem,
    sort,
    page,
    limit,
    type,
    column,
    itemId,
  ) => {
    return axios.get(
      `/get-item?page=${page}&limit=${limit}&itemId=${itemId}&filter=${filter}&key=${searchItem}&sort=${sort}&type=${type}&column=${column}`
    );
  },

  getItemWithPrice: (low, hight, name) => {
    return axios.get(
      `/get-item-follow-price?low=${low}&hight=${hight}&name=${name}`
    );
  },

  getItemFlashSale: () => {
    return axios.get(`/get-item-flashsale`);
  },

  // Category
  getCategory: () => {
    return axios.get(`/get-all-category`);
  },

  // Cart
  addCart: (value) => {
    return axios.post(`/add-cart`, value);
  },
  deleteCart: (value) => {
    return axios.post(`/delete-cart`, value);
  },

  // Order
  payOrder: (value) => {
    return axios.post(
      `/create-order`,
      { ...value },
    );
  },

  getOrder: (value) => {
    return axios.get(
      `/get-order?page=${value.page}&limit=${value.limit}&type=${value.type}&column=${value.column}`
    );
  },

  // Review
  createReview: (value) => {
    return axios.post(
      `/v2/review`,
      { ...value }
    );
  },

  getReview: (itemId) => {
    return axios.get(`/v2/review?itemId=${itemId}`);
  },

  getReviewFollowItem: (itemId, rateStar, page, limit) => {
    return axios.get(`/v2/reviews-with-item?itemId=${itemId}&page=${page}&limit=${limit}&rateStar=${rateStar}`);
  },

  getAllReview: (page, limit) => {
    return axios.get(`/v2/reviews?page=${page}&limit=${limit}`);
  },

  updateReview: (value) => {
    return axios.put(
      `/v2/review`,
      { ...value },
    );
  },

  // Stripe
  stripeConfig: () => {
    return axios.get('/v2/config-stripe');
  },

  createPaymentStripe: (value) => {
    return axios.post("/v2/create-payment-intent", {...value});
  }
};

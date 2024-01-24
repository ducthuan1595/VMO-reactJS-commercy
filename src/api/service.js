import axios from "axios";

const API_URl = process.env.REACT_APP_API_URL;
export const URL = API_URl + "/api";

export const requests = {
  register: (value) => {
    return axios.post(
      `${URL}/signup`,
      { ...value },
      {
        validateStatus: function (status) {
          return status < 500;
        },
      }
    );
  },

  login: (value) => {
    return axios.post(
      `${URL}/login`,
      { ...value },
      {
        validateStatus: function (status) {
          return status < 500;
        },
      }
    );
  },

  forgotPassword: (value) => {
    return axios.post(
      `${URL}/forgot-password`,
      { ...value },
      {
        validateStatus: function (status) {
          return status < 500;
        },
      }
    );
  },

  updateUser: (value, token) => {
    return axios.post(
      `${URL}/update-user`,
      { ...value },
      {
        validateStatus: function (status) {
          return status < 500;
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  // Voucher
  getVoucher: (page, limit, token) => {
    return axios.get(`${URL}/get-voucher?page=${page}&limit=${limit}`, {
      validateStatus: function (status) {
        return status < 500;
      },
    });
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
    token
  ) => {
    return axios.get(
      `${URL}/get-item?page=${page}&limit=${limit}&itemId=${itemId}&filter=${filter}&key=${searchItem}&sort=${sort}&type=${type}&column=${column}`,
      {
        validateStatus: function (status) {
          return status < 500;
        },
      }
    );
  },

  getItemWithPrice: (low, hight, name) => {
    return axios.get(
      `${URL}/get-item-follow-price?low=${low}&hight=${hight}&name=${name}`
    );
  },

  getItemFlashSale: () => {
    return axios.get(`${URL}/get-item-flashsale`, {
      validateStatus: function (status) {
        return status < 500;
      },
    });
  },

  // Category
  getCategory: () => {
    return axios.get(`${URL}/get-all-category`, {
      validateStatus: function (status) {
        return status < 500;
      },
    });
  },

  // Cart
  addCart: (value, token) => {
    return axios.post(`${URL}/add-cart`, value, {
      validateStatus: function (status) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteCart: (value, token) => {
    return axios.post(`${URL}/delete-cart`, value, {
      validateStatus: function (status) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Order
  payOrder: (value, token) => {
    return axios.post(
      `${URL}/create-order`,
      { ...value },
      {
        validateStatus: function (status) {
          return status < 500;
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getOrder: (value, token) => {
    return axios.get(
      `${URL}/get-order?page=${value.page}&limit=${value.limit}&type=${value.type}&column=${value.column}`,
      {
        validateStatus: function (status) {
          return status < 500;
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  // Review
  createReview: (value, token) => {
    return axios.post(
      `${URL}/v2/review`,
      { ...value },
      {
        validateStatus: function (status) {
          return status < 500;
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getReview: (token, itemId) => {
    return axios.get(`${URL}/v2/review?itemId=${itemId}`, {
      validateStatus: function (status) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateReview: (value, token) => {
    return axios.put(
      `${URL}/v2/review`,
      { ...value },
      {
        validateStatus: function (status) {
          return status < 500;
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};

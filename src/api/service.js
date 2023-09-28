import axios from "axios";

export const URL = "http://localhost:5050/api";
console.log({ URL });

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

  // Voucher
  getVoucher: (page, limit, token) => {
    return axios.get(`${URL}/get-voucher?page=${page}&limit=${limit}`, {
      validateStatus: function (status) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

import axios from "axios";

const URL = "http://localhost:5050/api";
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
};

import axios from 'axios';
import store from '../store';

const API_URl = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URl + "/api",
  validateStatus: function (status) {
    return status < 500;
  },
});

const requiringEndPoints  = [
  'add-cart',
  'delete-cart',
  'create-order',
  'get-order',
  'review',
  'avatar',
  'update-user'
]

instance.interceptors.request.use(function (config) {
  const token = store.getState().auth.token;

  if(requiringEndPoints.some(endpoint => config.url.includes(endpoint))) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  if(response.status < 500) {
    return response.data;
  }else {
    return Promise.reject('Request failed with status code is ' + response.status)
  }
}, function (error) {
  return Promise.reject(error)
});


export default instance;
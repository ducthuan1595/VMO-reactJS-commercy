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

instance.interceptors.request.use(async function (config) {
  // const assess_token = store.getState().auth.token.assess_token;

  if(requiringEndPoints.some(endpoint => config.url.includes(endpoint))) {
    const token = instance.getLocalAccessToken();
    if(!token) return config;

    const assess_token = token.access_token;
    if(assess_token.expires < new Date().getTime()) {
      const response = await refreshToken();
      if(response.message === 'ok') {
        instance.setLocalAccessToken(response.data);
      }
    }
    config.headers.Authorization = `Bearer ${instance.getLocalAccessToken().access_token.key}`
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

instance.setLocalAccessToken = async (token) => {
  window.localStorage.setItem('tim_gi_the_book_token', JSON.stringify(token))
}

instance.getLocalAccessToken = () => {
  const token = window.localStorage.getItem('tim_gi_the_book_token');
  return JSON.parse(token);
}

const refreshToken = () => {
  const refresh_token = instance.getLocalAccessToken().refresh_token;
  return instance.post('/refresh-token', {refresh_token})
}

export default instance;
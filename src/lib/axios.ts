import axios from 'axios';

const instance = axios.create({
  // Cloud function url
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default instance;

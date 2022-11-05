import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

http.interceptors.request.use(
  (config) => config,
  (error) => {
    console.log(error);
  },
);

http.interceptors.response.use(
  (config) => config.data,
  (error) => {
    console.log(error);
  },
);

export default http;

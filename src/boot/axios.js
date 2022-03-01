import axios from "axios";
import { Loading } from "quasar";

const axiosReq = axios.create({
  baseURL: process.env.DEV ? "/api" : "https://api.github.com",
});

axiosReq.interceptors.request.use(function (config) {
  config.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  Loading.show();
  return config;
});

axiosReq.interceptors.response.use(
  function (response) {
    Loading.hide();
    return response;
  },
  function (error) {
    Loading.hide();
    return Promise.reject(error);
  }
);

export { axiosReq };

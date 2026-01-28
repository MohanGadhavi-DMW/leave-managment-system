import axios from "axios";
import { getToken } from "../utils/utils";
import { redirectToReferer } from "./api.helpers";
export const BaseUrl = import.meta.env.VITE_HOST_URL;
export const apiServiceUrl = "/api/v1/";
const apiController = axios.create({
  baseURL: BaseUrl + apiServiceUrl,
  // timeout: 20000,
  withCredentials: true,
});

apiController.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    const params = new URLSearchParams(window.location.search);
    const journeyId = params.get("journeyId");
    config.headers["X-Q2T-Request-Id"] =
      journeyId ?? window.crypto.randomUUID();
    return config;
  },
  function (error) {
    console.log("error", error);
    return Promise.reject(error);
  },
);

apiController.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('response', response)
    if (response.status === 401 || response.status === 403) {
      redirectToReferer();
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error("error", error);
    if (error.response?.status === 401 || error.response.status === 403) {
      redirectToReferer();
    }
    return Promise.reject(error);
  },
);

export default apiController;

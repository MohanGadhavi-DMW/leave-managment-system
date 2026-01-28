import axios from "axios";
import Headers from "../constant/Headers";
import { redirectionUrl } from "@/api/Urls";

// axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  async (config) => {
    const token = await Headers.getSessionToken();
    console.log("TOKEN PRINT >> ", token);
    if (token) {
      let headers = Headers.getCommonHeadersWithToken();
      console.log("REQUEST HEADERS >> ", headers);
      config.headers = {
        ...headers,
        ...config.headers,
      };
    } else {
      config.headers = {
        ...Headers.getCommonHeaderParams(),
        ...config.headers,
      };
    }
    config.timeout = 3600000;
    config.validateStatus = (status) =>
      (status >= 200 && status < 300) || (status >= 400 && status < 500);
    console.log("REQUEST >> ", config);
    return config;
  },
  (error) => {
    console.log("REQ ERROR >> ", error);
    return errorHandle(error);
  },
);

axios.interceptors.response.use(
  async (response) => {
    console.log("RESPONSE >> ", response);
    console.log("RESPONSE >> ", response.data);
    if (response.status < 200 || response.status > 207) {
      let message = null;
      try {
        switch (response.status) {
          case 403:
            try {
              message =
                "You are not authorized, this may happen due to inactivity or system is down,\nplease log in to continue.";
              console.log("Token is expired. Please login again");
              global?.tokenExpired?.();
            } catch (error) {
              console.log("ERROR 403 >> ", error);
            }
            // window.location.replace(redirectionUrl + "/login");
            break;
          case 401:
            try {
              message =
                "Due to inactivity we have logged you out,\nplease log in to continue.";
              console.log("Token is expired. Please login again");
              global?.tokenExpired?.();
            } catch (error) {
              console.log("ERROR 401 >> ", error);
            }
            // window.location.replace(redirectionUrl + "/login");
            break;
          default:
            console.log("Something went wrong");
            break;
        }
      } catch (error) {
        console.log("ERROR RESPONSE >> ", error);
      }

      const { status, data, request } = response;
      if (message === null) {
        if (data.status === "error") {
          return _fillInErrorWithDefaults(
            {
              status,
              message: data.errors.join(" - "),
              errors: data.errors,
              url: request
                ? request.responseURL
                : response.config
                ? response.config.url
                : "",
              raw: response.data,
              httpStatus: response.status,
            },
            response.config,
          );
        }
      } else {
        return _fillInErrorWithDefaults(
          {
            status,
            message: message,
            errors: [],
            url: request
              ? request.responseURL
              : response.config
              ? response.config.url
              : "",
            raw: {},
            httpStatus: response.status,
          },
          response.config,
        );
      }
    }
    return response.data;
  },
  async (error) => {
    return errorHandle(error, error.response);
  },
);

function errorHandle(error, restRequest = {}) {
  console.log("API ERROR >> ", error, " >> REQUEST OBJECT >> ", restRequest);
  try {
    if (error.response) {
      const { status, statusText, data } = error.response;
      const errors =
        data && data.hasOwnProperty("errors")
          ? [statusText, ...data.errors]
          : [statusText];

      return _fillInErrorWithDefaults(
        {
          status,
          message: errors.filter(Boolean).join(" - "),
          errors,
          url: error.request.responseURL,
          raw: error.response,
          httpStatus: error.status,
        },
        restRequest,
      );
    } else if (error.request) {
      // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      const { status, statusText, responseURL } = error.request;

      return _fillInErrorWithDefaults(
        {
          status: error.code,
          message: error.message,
          errors: [statusText],
          url: responseURL,
          raw: error.request,
          httpStatus: error.status,
        },
        restRequest,
      );
    }

    // Something happened in setting up the request that triggered an Error
    return _fillInErrorWithDefaults(
      {
        status: 0,
        message: error.message,
        errors: [error.message],
        url: restRequest.url,
        raw: error,
      },
      restRequest,
    );
  } catch (error) {
    console.log("ERROR ERROR >> ", error);
  }
}

function _fillInErrorWithDefaults(error, request) {
  const model = {};

  model.status = error.status || 0;
  model.message = error.message || "Error requesting data";
  model.errors = error.errors.length ? error.errors : ["Error requesting data"];
  model.url = error.url || request.url;
  model.raw = error.raw;
  model.httpStatus = error.httpStatus;
  // Remove anything with undefined or empty strings.
  model.errors = model.errors.filter(Boolean);

  return model;
}

export default axios;

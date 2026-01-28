import ApiService from "../services/ApiService";
import ErrorAction from "../store/Error/ErrorAction";
import { isNullArray, isNullorEmpty } from "./ObjectHelper";
const RequestMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Delete: "DELETE",
  Options: "OPTIONS",
  Head: "HEAD",
  Patch: "PATCH",
};

export default class HttpUtility {
  static async get(endpoint, params, requestConfig) {
    // return ApiService.get(url);
    const paramsConfig = params ? { params } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Get,
      },
      {
        ...paramsConfig,
        ...requestConfig,
      },
    );
  }

  static async post(endpoint, data, conf) {
    let config = data ? { data } : undefined;
    console.log("conf", endpoint);
    if (conf) {
      console.log("post", data);
      config = { ...config, ...conf };
    }
    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Post,
      },
      config,
    );
  }

  static async put(endpoint, data) {
    const config = data ? { data } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Put,
      },
      config,
    );
  }

  static async delete(endpoint, data) {
    const config = data ? { data } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Delete,
      },
      config,
    );
  }
  static async _request(restRequest, config) {
    console.log("restRequest", restRequest);
    console.log("config", config);
    if (!restRequest.url) {
      console.error(
        `Received ${restRequest.url} which is invalid for a endpoint url`,
      );
    }

    const axiosRequestConfig = {
      ...config,
      method: restRequest.method,
      url: restRequest.url,
      headers: {
        ...config?.headers,
      },
    };

    const [axiosResponse] = await Promise.all([
      ApiService(axiosRequestConfig),
      HttpUtility._delay(),
    ]);

    console.log("axiosResponse", axiosResponse);

    return axiosResponse;
  }

  static _delay(duration = 250) {
    return new Promise((resolve) => setTimeout(resolve, duration))
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log("Axois Error", error);
        return error;
      });
  }

  static showError(dispatch, errorResponse) {
    let errorMessage = "Something went wrong";
    let errorType = "ERROR";
    if (errorResponse.status === "ERR_NETWORK") {
      errorMessage = "Service Down";
    } else if (errorResponse.status === "error") {
      errorType = "WARN";
      if (
        !isNullArray(errorResponse.error) &&
        !isNullorEmpty(errorResponse.error?.[0]?.errorMessage)
      ) {
        errorMessage = errorResponse.error?.[0]?.errorMessage ?? "";
      }
    }

    dispatch(
      ErrorAction.setMessage({
        heading: "Uh Oh!",
        subHeading: errorMessage,
        type: errorType,
        retryButton: errorResponse?.retryButton ?? true,
        showError: true,
        onErrorHandle: errorResponse?.onErrorHandle,
      }),
    );
  }
}

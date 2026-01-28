// import { EventSource } from 'eventsource';
import { getToken } from "src/utils/utils";

class EventSourceApiController extends EventSource {
  constructor(baseURL, headers = {}, options = {}) {
    const params = new URLSearchParams(window.location.search);
    const journeyId = params.get("journeyId");
    const requestId = journeyId ?? window.crypto.randomUUID();
    super(baseURL, {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          headers: {
            ...init.headers,
            Authorization: `Bearer ${getToken()}`,
            "x-q2t-request-id": requestId,
            "Content-Type": "application/json",
            Accept: "*/*",
            ...headers,
          },
          credentials: "include",
          ...options,
        }),
    });
  }

  onEvent(eventType, callback) {
    this.addEventListener(eventType, callback);
  }

  onError(callback) {
    this.addEventListener("error", callback);
  }
}
export default EventSourceApiController;

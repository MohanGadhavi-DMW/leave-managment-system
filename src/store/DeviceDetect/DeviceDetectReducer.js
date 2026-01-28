import DeviceDetectAction from "./DeviceDetectAction";

const initState = {
  isMobile: false,
};

export default class DeviceDetectReducer {
  static initialState = initState;

  static reducer(state = DeviceDetectReducer.initialState, action) {
    if (action.error) {
      return state;
    }
    switch (action.type) {
      case DeviceDetectAction.IS_MOBILE:
        // console.log("DeviceDetectAction.IS_MOBILE", action.payload);
        return {
          ...state,
          isMobile: action.payload,
        };
      default:
        return state;
    }
  }
}

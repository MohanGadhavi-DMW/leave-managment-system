import ErrorAction from "./ErrorAction";

const initState = {
  heading: "",
  subHeading: "",
  type: "ERROR",
  retryButton: false,
  showError: false,
};

export default class ErrorReducer {
  static initialState = initState;

  static reducer(state = ErrorReducer.initialState, action) {
    if (action.error) {
      return state;
    }
    switch (action.type) {
      case ErrorAction.MESSAGE:
        console.log("ErrorReducer handling MESSAGE", action);
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  }
}

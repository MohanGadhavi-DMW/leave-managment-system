import BaseReducer from "../BaseReducer";
import CommonAction from "./CommonAction";

export default class CommonReducer extends BaseReducer {
  initialState = {
    isLoading: false,
  };

  [CommonAction.SHOW_LOADER](state, action) {
    return {
      ...state,
      isLoading: action.payload || true,
    };
  }

  [CommonAction.SHOW_LOADER_FINISHED](state, action) {
    return {
      ...state,
      isLoading: false,
    };
  }
}

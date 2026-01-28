import SessionUtility from "@/constant/SessionUtility";
import AuthAction from "./AuthAction";

const initState = {
  isLogin: false,
  isDebug: false,
  userDetails: {},
};
export default class AuthReducer {
  static initialState = initState;

  static reducer(state = AuthReducer.initialState, action) {
    if (action.error) {
      return state;
    }
    switch (action.type) {
      case AuthAction.SAVE_USER_DATA:
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
          },
        };

      case AuthAction.LOGIN:
        let { data, isDebug } = action.payload;
        console.log("Data From Reducer", data);
        SessionUtility.SetItem(AuthAction.TOKEN, data.token);
        return {
          ...state,
          isLogin: true,
          isDebug: isDebug || false,
          userDetails: data.userDetails,
        };
      case AuthAction.LOGOUT:
        return {
          ...state,
          isLogin: false,
        };

      default:
        return state;
    }
  }
}

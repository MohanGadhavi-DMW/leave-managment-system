import ActionUtility from "../../utils/ActionUtils";
import Headers from "../../constant/Headers";
import ClientPreferenceAction from "../ClientPreference/ClientPreferenceAction";
import CommonAction from "../Common/CommonAction";
import AuthEffect from "./AuthEffect";

import HttpUtility from "../../utils/HttpUtils";
import ProfileAction from "../Profile/ProfileAction";
import SessionUtility from "@/constant/SessionUtility";

export default class AuthAction {
  static SAVE_USER_DATA = "AuthAction.SAVE_USER_DATA";
  static LOGIN = "AuthAction.LOGIN";
  static LOGOUT = "AuthAction.LOGOUT";
  static TOKEN = "TOKEN";

  static setLoader() {
    return async (dispatch, getState) => {
      await dispatch(CommonAction.showLoader());
    };
  }

  static saveUserDetails(data) {
    return async (dispatch, getState) => {
      await dispatch(
        ActionUtility.createAction(AuthAction.SAVE_USER_DATA, data),
      );
    };
  }

  static logout() {
    return (dispatch) => {
      // 3️⃣ Logout
      dispatch(ActionUtility.createAction(AuthAction.LOGOUT, {}));
    };
  }

  static redirectLogin = (data, lob) => {
    return async (dispatch, getState) => {
      dispatch(
        ActionUtility.createAction(AuthAction.LOGIN, {
          data: data,
          lob: lob,
        }),
      );
    };
  };

  static login = (data, isDebug) => {
    return async (dispatch, getState) => {
      console.log("login payload: ", data);
      const result = await AuthEffect.login(data);
      console.log("login result: ", result);
      if (result.status === "success") {
        const resultData = result.data;
        if (resultData) {
          Headers.setSessionToken(resultData.token);
          await dispatch(
            ActionUtility.createAction(AuthAction.LOGIN, {
              data: resultData,
              isDebug: isDebug || false,
            }),
          );

          if (resultData.meta_data && resultData.meta_data?.THEME) {
            await dispatch(
              ClientPreferenceAction.getPreference(resultData.meta_data?.THEME),
            );
          }

          return result;
        }
      }

      HttpUtility.showError(dispatch, result);
      return result;
    };
  };
}

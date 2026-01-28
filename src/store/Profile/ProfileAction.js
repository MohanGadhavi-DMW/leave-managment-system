import ActionUtility from "@/utils/ActionUtils";
import ProfileEffect from "./ProfileEffect";
import HttpUtility from "@/utils/HttpUtils";
import Headers from "@/constant/Headers";

// Action Types
export default class ProfileAction {
  static SET_USER_PROFILE = "SET_USER_PROFILE";
  static SET_USER_PREF = "SET_USER_PREF";
  static STORAGE_ACTIVE_MENU = "ACTIVE_MENU";
  static SET_ACTIVE_MENU = "SET_ACTIVE_MENU";

  static SendOtp(data) {
    return async (dispatch, getState) => {
      const result = await ProfileEffect.SendOtp(data);
      if (result?.status === "success") {
        const resultData = result.data;
        if (resultData) {
          Headers.setSessionToken(resultData.token);
          return true;
        }
      } else {
        HttpUtility.showError(dispatch, result);
      }
      return true;
    };
  }
  static VerifyOtpRegister(data) {
    return async (dispatch, getState) => {
      const result = await ProfileEffect.VerifyOtpRegister(data);
      console.log("VerifyOtpRegister Result >>>", result);
      if (result?.status === "success") {
        if (result?.data) {
          Headers.setSessionToken(result?.data);
        }
        // Return the full result with access_token
      } else {
        HttpUtility.showError(dispatch, result);
      }
      return result;
    };
  }
  static VerifyOtp(data) {
    return async (dispatch, getState) => {
      const result = await ProfileEffect.VerifyOtp(data);
      console.log("VerifyOtp Result >>>", result);
      if (result?.status === "success") {
        if (result?.data) {
          Headers.setSessionToken(result?.data);
        }
        // Return the full result with access_token
      } else {
        HttpUtility.showError(dispatch, result);
      }
      return result;
    };
  }

  static SetPassword(data) {
    return async (dispatch, getState) => {
      const result = await ProfileEffect.SetPassword(data);
      console.log("SetPassword >>>", result);

      if (result?.status !== "success") {
        HttpUtility.showError(dispatch, result);
      }
      return result;
    };
  }

  static ResetPassword(data) {
    return async (dispatch, getState) => {
      const result = await ProfileEffect.ResetPassword(data);
      console.log("ResetPassword >>>", result);

      if (result?.status !== "success") {
        HttpUtility.showError(dispatch, result);
      }
      return result;
    };
  }

  // Action Creators
  static setUserProfile(data) {
    return async (dispatch, getState) => {
      dispatch(
        ActionUtility.createAction(ProfileAction.SET_USER_PROFILE, data),
      );
    };
  }

  static setUserPref(data) {
    return async (dispatch, getState) => {
      dispatch(ActionUtility.createAction(ProfileAction.SET_USER_PREF, data));
    };
  }

  static setActiveMenu(menu) {
    return async (dispatch, getState) => {
      dispatch(ActionUtility.createAction(ProfileAction.SET_ACTIVE_MENU, menu));
    };
  }
}

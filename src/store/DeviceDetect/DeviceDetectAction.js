import ActionUtility from "../../utils/ActionUtils";

export default class DeviceDetectAction {
  static IS_MOBILE = "DeviceDetectAction.IS_MOBILE";
  static isMobile(mobile) {
    return async (dispatch, getState) => {
      dispatch(
        ActionUtility.createAction(DeviceDetectAction.IS_MOBILE, mobile)
      );
    };
  }
}

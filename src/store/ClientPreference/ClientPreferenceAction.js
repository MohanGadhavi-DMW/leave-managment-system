import ActionUtility from "../../utils/ActionUtils";
import ClientPreferenceEffect from "./ClientPreferenceEffect";

export default class ClientPreferenceAction {
  static PREFERENCE = "ClientPreferenceAction.PREFERENCE";
  static getPreference(data) {
    return async (dispatch, getState) => {
      dispatch(
        ActionUtility.createAction(ClientPreferenceAction.PREFERENCE, data)
      );
    };
    // return async (dispatch, getState) => {
    //   const result = await ClientPreferenceEffect.getPreference(id);

    //   if (result.status === "success") {
    //     dispatch(
    //       ActionUtility.createAction(
    //         ClientPreferenceAction.PREFERENCE,
    //         result.data
    //       )
    //     );
    //   }
    // };
  }
}

import ActionUtility from "../../utils/ActionUtils";

export default class ErrorAction {
  static MESSAGE = "ErrorAction.MESSAGE";
  static setMessage(data) {
    console.log("Hellloooooooo", data);
    return async (dispatch, getState) => {
      dispatch(ActionUtility.createAction(ErrorAction.MESSAGE, data));
    };
  }
}

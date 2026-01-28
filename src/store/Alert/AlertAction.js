import ActionUtility from "../../utils/ActionUtils";

export default class AlertAction {
  static ALERT_SHOW = "AlertAction.ALERT_SHOW";
  static ALERT_CLEAR = "AlertAction.ALERT_CLEAR";

  static showAlert = (alert) => {
    return ActionUtility.createAction(AlertAction.ALERT_SHOW, alert);
  };
  static clearAlert = () => {
    return ActionUtility.createAction(AlertAction.ALERT_CLEAR);
  };
}

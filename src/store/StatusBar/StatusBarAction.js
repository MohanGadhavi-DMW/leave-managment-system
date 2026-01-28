import ActionUtility from "../../utils/ActionUtils";

export default class StatusBarAction {
  static StatusBar_ADD = "StatusBarAction.StatusBar_ADD";
  static StatusBar_UPDATE = "StatusBarAction.StatusBar_UPDATE";
  static StatusBar_REMOVE = "StatusBarAction.StatusBar_REMOVE";
  static StatusBar_CLEAR = "StatusBarAction.StatusBar_CLEAR";

  static addItem = (item) => {
    return ActionUtility.createAction(StatusBarAction.StatusBar_ADD, item);
  };

  static updateItem = (item) => {
    return ActionUtility.createAction(StatusBarAction.StatusBar_UPDATE, item);
  };
  static removeItem = (id) => {
    return ActionUtility.createAction(StatusBarAction.StatusBar_REMOVE, id);
  };

  static clearAll = () => {
    return ActionUtility.createAction(StatusBarAction.StatusBar_CLEAR);
  };
}

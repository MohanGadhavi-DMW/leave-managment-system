import ActionUtility from "../../utils/ActionUtils";

 

export default class CommonAction {
  static SHOW_LOADER = "CommonAction.SHOW_LOADER";
  static SHOW_LOADER_FINISHED = "CommonAction.SHOW_LOADER_FINISHED";

  static showLoader() {
    return ActionUtility.createAction(CommonAction.SHOW_LOADER, true);
  }
  static hideLoader() {
    return ActionUtility.createAction(CommonAction.SHOW_LOADER_FINISHED, false);
  }
}

import AlertAction from "./AlertAction";

const initState = {
  // size: "xxl",
  // className: "",
  // icon: <></>,
  // header: <></>,
  // children: <></>,
  // isModal: false,
  // buttonList: [
  // {
  //   label: "Close",
  //   type: "primary",
  //   size: "sm",
  //   onClick: () => {
  //     return false;  //Dialog will not close if function return false (support for validations)
  //     return true; //Dialog will close if function return true  (support for validations)
  //     //Dont return anything, Dialog will close automatically  (default behaviour)
  //   },
  // }
  // ],
};
export default class AlertReducer {
  static initialState = initState;

  static reducer(state = AlertReducer.initialState, action) {
    if (action.error) {
      return state;
    }
    switch (action.type) {
      case AlertAction.ALERT_SHOW:
        // console.log("Alert Reducer ", action.payload);
        return { ...state, ...action.payload };
      case AlertAction.ALERT_CLEAR:
        // console.log("Alert Reducer ", action.payload);
        return { ...initState };

      default:
        return state;
    }
  }
}

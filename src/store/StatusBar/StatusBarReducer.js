import { deepClone } from "../../utils/ObjectHelper";
import StatusBarAction from "./StatusBarAction";

const initState = {
  items: {},
};
export default class StatusBarReducer {
  static initialState = initState;

  static reducer(state = StatusBarReducer.initialState, action) {
    if (action.error) {
      return state;
    }
    switch (action.type) {
      case StatusBarAction.StatusBar_ADD:
        // console.log("StatusBarAction ADD", action.payload);
        let itemsAdd = deepClone(state.items || {});
        return { ...state, items: { ...itemsAdd, ...action.payload } };
      case StatusBarAction.StatusBar_UPDATE:
        // console.log("StatusBarAction UPDATE", action.payload);
        let itemsUpdate = deepClone(state.items || {});
        Object.keys(action.payload)?.map((key) => {
          if (key) {
            itemsUpdate[key] = action.payload[key];
          }
        });
        return { ...state, items: { ...itemsUpdate } };
      case StatusBarAction.StatusBar_REMOVE:
        // console.log("StatusBarAction REMOVE", action.payload);
        const oldItems = deepClone(state.items || {});
        let newItems = {};
        Object.keys(oldItems).map((key) => {
          if (key !== action.payload) {
            newItems = { ...newItems, [key]: oldItems[key] };
          }
        });
        return { ...state, items: newItems || [] };
      case StatusBarAction.StatusBar_CLEAR:
        return { ...initState };
      default:
        return state;
    }
  }
}

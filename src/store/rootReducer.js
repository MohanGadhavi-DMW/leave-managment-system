import { combineReducers } from "redux";
import AuthReducer from "./Auth/AuthReducer";
import ClientPreferenceReducer from "./ClientPreference/ClientPreferenceReducer";
import AlertReducer from "./Alert/AlertReducer";
import DeviceDetectReducer from "./DeviceDetect/DeviceDetectReducer";

import ErrorReducer from "./Error/ErrorReducer";
import ProfileReducer from "./Profile/ProfileReducer";
import StatusBarReducer from "./StatusBar/StatusBarReducer";

const reducers = {
  //   common: new CommonReducer().reducer,
  auth: AuthReducer.reducer,
  alert: AlertReducer.reducer,
  error: ErrorReducer.reducer,
  profile: ProfileReducer.reducer,
  statusBar: StatusBarReducer.reducer,
  clientPreference: ClientPreferenceReducer.reducer,
  device: DeviceDetectReducer.reducer,
};

export const appReducer = combineReducers(reducers);
const rootReducer = (state, action) => {
  //   if (action.type === AuthAction.LOGOUT) {
  //     return appReducer(undefined, action);
  //   }

  return appReducer(state, action);
};

export default rootReducer;

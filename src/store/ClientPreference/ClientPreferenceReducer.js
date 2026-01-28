import { isNullorEmpty } from "../../utils/ObjectHelper";
import ClientPreferenceAction from "./ClientPreferenceAction";

export const ConfigPrimaryColor = import.meta.env.VITE_CLIENT_PRIMARY_COLOR;
export const ConfigSecondaryColor =
  import.meta.env.VITE_CLIENT_SECONDARY_COLOR;
export const ConfigHeaderSticky = import.meta.env.VITE_HEADER_STICKY || "N";

const initState = {
  primaryColor: isNullorEmpty(ConfigPrimaryColor)
    ? "#f45225"
    : ConfigPrimaryColor,
  secondaryColor: isNullorEmpty(ConfigSecondaryColor)
    ? "#f2f2f2"
    : ConfigSecondaryColor,
};

export default class ClientPreferenceReducer {
  static initialState = initState;

  static reducer(state = ClientPreferenceReducer.initialState, action) {
    if (action.error) {
      return state;
    }
    switch (action.type) {
      case ClientPreferenceAction.PREFERENCE:
        const primaryColor = isNullorEmpty(ConfigPrimaryColor)
          ? action.payload.primaryColor || state.primaryColor
          : ConfigPrimaryColor;
        const secondaryColor = isNullorEmpty(ConfigSecondaryColor)
          ? action.payload.secondaryColor || state.secondaryColor
          : ConfigSecondaryColor;
        return {
          ...state,
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
        };
      default:
        return state;
    }
  }
}

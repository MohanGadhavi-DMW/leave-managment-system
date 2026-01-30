import ProfileAction from "./ProfileAction";
import SessionUtility from "@/constant/SessionUtility";

const initState = {
  userProfile: {
    id: "",
    name: "",
    email: "",
    role: "",
  },
  userPref: {
    theme: "",
    language: "",
    notifications: true,
    activeMenu: SessionUtility.GetItem(ProfileAction.STORAGE_ACTIVE_MENU),
    activeCategory: {
      label: "Myself",
      value: "myself",
    },
  },
};

export default class ProfileReducer {
  static initialState = initState;

  static reducer(state = ProfileReducer.initialState, action) {
    switch (action.type) {
      case ProfileAction.SET_USER_PROFILE:
        return {
          ...state,
          userProfile: {
            ...state.userProfile,
            ...action.payload,
          },
        };

      case ProfileAction.SET_USER_PREF:
        return {
          ...state,
          userPref: {
            ...state.userPref,
            ...action.payload,
          },
        };
      case ProfileAction.SET_ACTIVE_MENU:
        SessionUtility.SetItem(
          ProfileAction.STORAGE_ACTIVE_MENU,
          action.payload,
        );
        const newUserPref = { ...state.userPref, activeMenu: action.payload };
        return {
          ...state,
          userPref: newUserPref,
        };
      case ProfileAction.SET_ACTIVE_CATEGORY: {
        const newUserPref = {
          ...state.userPref,
          activeCategory: action.payload,
        };
        return {
          ...state,
          userPref: newUserPref,
        };
      }
      default:
        return state;
    }
  }
}

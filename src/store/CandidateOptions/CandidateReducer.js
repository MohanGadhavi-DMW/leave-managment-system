import { isAllAvailableSection } from "../@/components/CommonUtility";
import { deepClone, isNullArray } from "../../utils/ObjectHelper";
import CandidateAction from "./CandidateAction";
import TrainAction from "./TrainAction";

const initState = {
  candidateOptionsList: [],

  isSearchClick: false,
  trainSearchCriteria: {},
  loadingList: false,
  loadingFilter: false,
};

export default class CandidateReducer {
  static initialState = initState;

  static reducer(state = CandidateReducer.initialState, action) {
    if (action.error) {
      return state;
    }

    switch (action.type) {
      case CandidateAction.CANDIDATE_LIST:
        return {
          ...state,
          candidateOptionsList: action.payload,
        };
    }
  }
}

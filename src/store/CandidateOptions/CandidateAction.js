import ActionUtility from "../../utils/ActionUtils";

export default class CandidateAction {
  static CANDIDATE_LIST = "CandidateAction.CANDIDATE_LIST";
  static CANDIDATE_CRITERIA = "CandidateAction.CANDIDATE_CRITERIA";
  static LOADING_LIST = "CandidateAction.LOADING_LIST";
  static LOADING_FILTER = "CandidateAction.LOADING_FILTER";
  static SEARCH_CLICK = "CandidateAction.SEARCH_CLICK";

  static setCandidateList = (train, defaultTrainClass) => {
    return ActionUtility.createAction(CandidateAction.CANDIDATE_LIST, {
      train: train,
      defaultTrainClass: defaultTrainClass,
    });
  };

   

 
  static setCandidateSearchCriteria = (train) => {
    return ActionUtility.createAction(CandidateAction.CANDIDATE_CRITERIA, train);
  };
 

  

  
  static setSearchClick = (isSearchClick) => {
    return ActionUtility.createAction(CandidateAction.SEARCH_CLICK, isSearchClick);
  };

  static loadingList = (isLoading) => {
    return ActionUtility.createAction(CandidateAction.LOADING_LIST, isLoading);
  };

  static loadingFilter = (isLoading) => {
    return ActionUtility.createAction(CandidateAction.LOADING_FILTER, isLoading);
  };

   
}

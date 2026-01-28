import { bindTypeWithPromiseStatusType } from "./helpers"

export const fetchDataThunkKey = bindTypeWithPromiseStatusType("fetchData")
export const getFilterData = bindTypeWithPromiseStatusType("GET_FILTER_DATA")
export const getQuickSortData = bindTypeWithPromiseStatusType("GET_QUICK_SORT_DATA")
export const getViewFaresData = bindTypeWithPromiseStatusType("GET_VIEW_FARES_DATA")
export const getFlightReviewData = bindTypeWithPromiseStatusType("GET_FLIGHT_REVIEW_DATA")
export const getFlightRepricingData = bindTypeWithPromiseStatusType("GET_FLIGHT_REPRICING_DATA")
export const getFlightSearchData = bindTypeWithPromiseStatusType("GET_FLIGHT_SEARCH_DATA")
export const SEARCH_UPDATE_TYPE = "SEARCH_UPDATE"
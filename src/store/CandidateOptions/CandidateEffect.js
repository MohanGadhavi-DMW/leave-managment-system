import {
  TrainDetailsUrl,
  TrainListingUrl,
  TrainRouteUrl,
  TrainSaveUrl,
  TrainStationUrl,
} from "../../api/Urls";

import HttpUtility from "../../utils/HttpUtils";

export default class CandidateEffect {
  static async trainList(train) {
    let response = await HttpUtility.post(TrainListingUrl, train);
    return response;
  }

 
}

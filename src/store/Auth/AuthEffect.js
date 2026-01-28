import HttpUtility from "../../utils/HttpUtils";
import { LoginUrl } from "../../api/Urls";

export default class AuthEffect {
  // static async requestGeoLocation(params) {
  //   let response = await HttpUtility.post(GeoLocation, params);

  //   return response;
  // }

  static async login(data) {
    let response = await HttpUtility.post(LoginUrl, data);
    console.log("Loginnnnnnn", LoginUrl, data);
    return response;
  }
}

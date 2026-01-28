import {
  ResetPasswordUrl,
  SendOtpUrl,
  SetPasswordUrl,
  VerifyOtpRegisterUrl,
  VerifyOtpUrl,
} from "@/api/Urls";
import HttpUtility from "@/utils/HttpUtils";

export default class ProfileEffect {
  static async SendOtp(data) {
    let response = await HttpUtility.post(SendOtpUrl, data);
    console.log("SendOtp>>>>", SendOtpUrl, data);
    return response;
  }

  static async VerifyOtpRegister(data) {
    let response = await HttpUtility.post(VerifyOtpRegisterUrl, data);
    console.log("VerifyOtpRegister>>>>", VerifyOtpRegisterUrl, data);
    return response;
  }

  static async VerifyOtp(data) {
    let response = await HttpUtility.post(VerifyOtpUrl, data);
    console.log("VerifyOtp>>>>", VerifyOtpUrl, data);
    return response;
  }

  static async SetPassword(data, headersConfig) {
    let response = await HttpUtility.post(
      SetPasswordUrl,
      data,
      headersConfig?.headers,
    );
    return response;
  }

  static async ResetPassword(data, headersConfig) {
    let response = await HttpUtility.post(
      ResetPasswordUrl,
      data,
      headersConfig?.headers,
    );
    return response;
  }
}

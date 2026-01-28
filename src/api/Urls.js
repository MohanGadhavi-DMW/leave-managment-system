export const Environment = import.meta.env.REACT_APP_ENVIRONMENT;
export const PublicIconPath = import.meta.env.PUBLIC_URL + "/icons";
export const PublicAirlinesPath = import.meta.env.PUBLIC_URL + "/airlines";
export const BaseUrl = import.meta.env.VITE_API_BASEURL;
export const redirectionUrl = import.meta.env.VITE_REDIRECTION_LINK;
export const paymentRedirectionUrl = import.meta.env
  .REACT_APP_PAYMENT_REDIRECTION_LINK;
export const CarCityLimitInKms = parseInt(
  import.meta.env.REACT_APP_CAR_CITY_LIMIT_IN_KMS,
);

export const guestHouseImagesBaseUrl = import.meta.env.REACT_APP_GH_IMAGE_URL;

console.log("BaseUrl", BaseUrl);
// console.log("redirectionUrl", redirectionUrl);

export const LoginUrl = `${BaseUrl}/api/v1/auth/login`;
export const SendOtpUrl = `${BaseUrl}/api/v1/register/send-otp`;
export const VerifyOtpRegisterUrl = `${BaseUrl}/api/v1/register/verify-otp-register`; //Register
export const VerifyOtpUrl = `${BaseUrl}/api/v1/register/verify-otp`; //Forgot Password
export const SetPasswordUrl = `${BaseUrl}/api/v1/register/set-password`;
export const ResetPasswordUrl = `${BaseUrl}/api/v1/register/reset-password`;

function Headers() {
  let sessionToken = "";
  let deviceId = "";
  return {
    getCommonHeaderParams() {
      return {
        "Content-Type": "application/json",
        platform: "web",
        Accept: "application/json",
      };
    },
    getCommonHeaderParamsEncrypation() {
      return {
        "Content-Type": "text/plain",
        platform: "web",
        deviceId: deviceId,
      };
    },
    setSessionToken(token) {
      sessionToken = token;
    },
    setDeviceId(id) {
      deviceId = id;
    },
    getSessionToken() {
      return sessionToken;
    },
    getCommonHeadersWithToken() {
      return {
        ...this.getCommonHeaderParams(),
        Authorization: `Bearer ${sessionToken}`,
      };
    },
    getCommonHeadersWithTokenEncryption() {
      return {
        ...this.getCommonHeaderParamsEncrypation(),
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };
    },
  };
}

export default Headers();

export default class ClientPreferenceEffect {
  static async getPreference(data) {
    // let response = await HttpUtility.get(`${ClientPreference}/${id}`);

    // let response = {
    //   data: { foreground: "#fff", background: "#f45225" },
    //   status: "success",
    // };
    let response = {
      data: data,
      status: "success",
    };
    return response;
  }
}

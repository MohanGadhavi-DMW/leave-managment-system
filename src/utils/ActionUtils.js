export default class ActionUtility {
  static createAction(type, payload, error = false, meta = null) {
    return { type, payload, error, meta };
  }
}

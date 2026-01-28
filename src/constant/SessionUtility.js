function SessionUtility() {
  return {
    GetItem(key) {
      const value = sessionStorage.getItem(key);
      console.log("value", value);
      return !value || value === null ? {} : JSON.parse(value);
    },
    SetItem(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value || {}));
    },
    RemoveItem(key) {
      sessionStorage.removeItem(key);
    },
  };
}

export default SessionUtility();

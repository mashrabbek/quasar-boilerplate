import { Cookies } from "quasar";
//import { decode } from "jsonwebtoken";

const StorageService = {
  isCookieExist(key) {
    return new Promise((resolve, reject) => {
      try {
        let isCookieExist = Boolean(Cookies.has(key));
        resolve(isCookieExist);
      } catch (error) {
        reject(error);
      }
    });
  },
  setCookie(key, val) {
    Cookies.set(key, val);
  },
  getCookieByKey(key) {
    return new Promise((resolve, reject) => {
      try {
        let value = Cookies.get(key);
        resolve(value);
      } catch (error) {
        reject(error);
      }
    });
  },
  removeCookie(key) {
    try {
      Cookies.remove(key);
    } catch (error) {
      throw new Error(error);
    }
  },
  replaceCookie(key, value) {
    try {
      Cookies.remove(key);
      Cookies.set(key, value);
    } catch (error) {
      throw new Error(error);
    }
  }
};

export default StorageService;

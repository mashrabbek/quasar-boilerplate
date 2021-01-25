import store from "@/store/index";
import ApiService from "@/services/api.service";
import StorageService from "@/services/storage.service";
import DataService from "@/services/data.service";
import router from "@/router/index";

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const AuthService = {
  login: async function(credentials, callback) {
    //store.dispatch("auth/loginRequest");

    this.authenticate(credentials)
      .then(
        async token => {
          // set cookie value
          console.log("set cookie value");
          StorageService.setCookie(process.env.TOKEN_KEY, token);
          console.log("set axios header");
          // set axios header
          ApiService.setHeader(token);
          console.log("mount interceptor");
          // mount interceptor
          ApiService.mount401Interceptor();
          console.log("load user data");
          // load user data
          await DataService.loadAll();

          callback(null, true);
        },
        error => {
          callback(error, false);
          //throw new AuthenticationError(500, "Can't get token")
        }
      )
      .catch(error => {
        callback(error, false);
      });
  },

  logout: async function() {
    //sessionStorage.clear();
    //LoadingService.showLoadingDots();
    try {
      let token = await StorageService.getCookieByKey(process.env.TOKEN_KEY);
      console.log("remove cookie");
      // remove cookie
      await StorageService.removeCookie(process.env.TOKEN_KEY);
      console.log("remove axios header");

      let resp = await ApiService.customRequest({
        method: "delete",
        url: "/int/auth/token",
        data: { accessToken: token }
      });

      // remove axios header
      ApiService.removeHeader();
      console.log("unmount interceptor");
      // unmount interceptor
      ApiService.unmount401Interceptor();

      console.log("clear token from cache");
      console.log({ resp });
      // set isLoaded false
      store.dispatch("userdata/setAllLoaded", false);
      console.log("set isLoaded false an push");

      router.push("/login");
    } catch (error) {
      console.log({
        "Error in logout": error
      });
      throw error;
    }
  },

  async refreshPage() {
    console.log("refreshing page..");
    let token = await StorageService.getCookieByKey(process.env.TOKEN_KEY);
    console.log(" set axios header");
    // set axios header
    ApiService.setHeader(token);
    console.log("mount interceptor");
    // mount interceptor
    ApiService.mount401Interceptor();
    console.log("load user data");
    // load user data
    await DataService.loadAll();

    return;
  },

  authenticate: function(credentials) {
    return new Promise(async (resolve, reject) => {
      const requestData = {
        method: "post",
        url: "/int/auth/login",
        data: credentials
      };
      try {
        const response = await ApiService.customRequest(requestData);
        if (response.data.status == 1) {
          resolve(response.data.access_token);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        //console.error("Error occured here 4 !!!");
        reject(error);
      }
    });
  },

  refreshToken() {
    //const token = UserService.refreshToken();
    if (!store.getters["auth/refreshTokenPromise"]) {
      const p = this.refreshAccessToken();
      store.dispatch("auth/refreshTokenPromise", p);

      // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
      // Clear the promise on error as well.
      p.then(
        response => {
          store.dispatch("auth/refreshTokenPromise", null);
          //store.dispatch("auth/loginSuccess", response);
        },
        error => {
          store.dispatch("auth/refreshTokenPromise", null);
          throw new AuthenticationError(error.errorCode, error.message);
        }
      ).catch(error => {
        throw new AuthenticationError(error.errorCode, error.message);
      });
    }
    return store.getters["auth/refreshTokenPromise"];
    //commit('setToken', token);
  },

  // refresh Token
  refreshAccessToken: async function() {
    const accessToken = await StorageService.getCookieByKey(
      process.env.TOKEN_KEY
    ); //  get accesToken from cookie

    const requestData = {
      method: "post",
      url: "int/auth/token",
      data: {
        accessToken: accessToken
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);

      if (await StorageService.isCookieExist(process.env.TOKEN_KEY)) {
        StorageService.removeCookie(process.env.TOKEN_KEY);
        console.log("token cleared");
      }

      console.log("storing token...");
      StorageService.setCookie(
        process.env.TOKEN_KEY,
        response.data.access_token
      );

      // Update the header in ApiService
      ApiService.setHeader(response.data.access_token);

      return response.data.access_token;
    } catch (error) {
      throw new AuthenticationError(
        error.response.status,
        error.response.data.detail
      );
    }
  }
};

export { AuthService, AuthenticationError };

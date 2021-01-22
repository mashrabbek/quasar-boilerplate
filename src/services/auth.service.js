import store from "@/store/index";
import ApiService from "@/services/api.service";
import StorageService from "@/services/storage.service";
import DataService from "@/services/data.service";

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
          // get menus, etc..
          await DataService.loadAll(token);

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
          StorageService.setCookie(
            process.env.TOKEN_KEY,
            response.data.access_token
          );
          ApiService.setHeader(response.data.access_token);
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

  logout: async function() {
    //sessionStorage.clear();
    //LoadingService.showLoadingDots();
    try {
      ApiService.unmount401Interceptor();

      //   await this.clearTokenFromCache(store.getters["auth/token"])
      //     .then(
      //       result => {
      //         console.log("token cleared");
      //       },
      //       error => {
      //         console.error(error);
      //       }
      //     )
      //     .catch(err => {
      //       console.error(err);
      //       throw err;
      //     });

      ApiService.removeHeader();

      //await MainService.clearStorage();

      //store.dispatch("dicts/setIsAllSet", false);

      //store.dispatch("auth/logoutSuccess");

      //   if (!(await TokenService.isTokenExist())) {
      //     router.push("/login");
      //   }
    } catch (error) {
      console.log({
        "Error in logout": error
      });
      throw error;
    }
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
          store.dispatch("auth/loginSuccess", response);
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
    const accessToken = await TokenService.getToken(); //  get accesToken from cookie

    const requestData = {
      method: "post",
      url: "auth/token",
      data: {
        accessToken: accessToken
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);
      if (await TokenService.isTokenExist()) {
        TokenService.removeToken();
        console.log("token cleared");
      }
      console.log("storing token...");
      TokenService.saveToken(response.data.access_token);
      //TokenService.saveRefreshToken(response.data.refresh_token)
      // Update the header in ApiService
      ApiService.setHeader(response.data.access_token);

      return response.data.access_token;
    } catch (error) {
      throw new AuthenticationError(
        error.response.status,
        error.response.data.detail
      );
    }
  },
  async clearTokenFromCache(token) {
    return new Promise(async (res, rej) => {
      const requestData = {
        method: "delete",
        url: "auth/token",
        data: {
          token: token
        }
      };
      try {
        ApiService.customRequest(requestData).then(
          result => {
            res(result);
          },
          error => {
            reject(error);
          }
        );
      } catch (error) {
        rej(
          new AuthenticationError(
            error.response.status,
            error.response.data.detail
          )
        );
        throw new AuthenticationError(
          error.response.status,
          error.response.data.detail
        );
      }
    });
  },
  remoteLogin: async function(emp_id, callback) {
    let empId = CommonUtils.valueOf(emp_id);

    if (empId) {
      if (empId == -1) {
        // if wanted to go back
        let admin_token = await TokenService.getKey("admin_token");

        // if admin_token not exist then there was no remote access
        if (admin_token == null) {
          callback(false);
        } else {
          // otherwise there have been remote acesses so clear to return back
          TokenService.replaceToken(admin_token);
          TokenService.removeKey("admin_token");
          TokenService.removeKey("menus");
          callback(true);
        }
      } else {
        // if tried to remote access

        const requestData = {
          method: "post",
          url: "auth/remoteLogin",
          data: {
            emp_id: empId
          }
        };

        try {
          const resp = await ApiService.customRequest(requestData);
          console.log(resp.data);

          if (resp.data.status == 1) {
            let token = resp.data.access_token;
            let adminKey = await TokenService.getKey("admin_token");
            if (adminKey == null) {
              TokenService.setKey("admin_token", await TokenService.getToken());
            }
            TokenService.replaceToken(token);
            TokenService.removeKey("menus");
            callback(true);
          } else {
            callback(null);
          }
        } catch (error) {
          console.error("Error occured !!!");
          callback(null);

          throw new AuthenticationError(
            error.response.status,
            error.response.data.detail
          );
        }
      }
    } else {
      NotifyService.showErrorMessage("erronous input");
    }
  }
};

export { AuthService, AuthenticationError };

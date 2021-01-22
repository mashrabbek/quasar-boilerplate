import axios from "axios";
import { AuthService } from "@/services/auth.service";

const ApiService = {
  _401interceptor: null,

  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  setHeader(accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  },
  getHeader() {
    return axios.defaults.headers.common["Authorization"];
  },
  removeHeader() {
    axios.defaults.headers.common = {};
  },
  get(resource) {
    return axios.get(resource);
  },
  post(resource, data) {
    return axios.post(resource, data);
  },
  put(resource, data) {
    return axios.put(resource, data);
  },
  delete(resource) {
    return axios.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    console.log({ def: axios.defaults });
    return axios(data);
  },

  mount401Interceptor() {
    this._401interceptor = axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        if (error.request.status == 401) {
          if (error.config.url.includes("/int/auth/token")) {
            // Refresh token has failed. Logout the user
            console.log("Refresh token has failed. Logout the user");
            await AuthService.logout();
          } else {
            // Refresh the access token
            try {
              await AuthService.refreshToken();
              // Retry the original request
              return this.customRequest({
                method: error.config.method,
                url: error.config.url,
                data: error.config.data
              });
            } catch (e) {
              // Refresh has failed - reject the original request
              throw error;
            }
          }
        }
        {
          // If error was not 401 just reject as is
          throw error;
        }
      }
    );
  },
  unmount401Interceptor() {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor);
  }
};

export default ApiService;

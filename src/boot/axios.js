import Vue from "vue";
import axios from "axios";
import ApiService from "@/services/api.service";

console.log({ base: process.env.VUE_APP_BASE_URL });
ApiService.init(process.env.VUE_APP_BASE_URL);
ApiService.mount401Interceptor();

Vue.prototype.$axios = axios;

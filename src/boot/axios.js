import Vue from "vue";
import axios from "axios";
import ApiService from "@/services/api.service";

ApiService.init(process.env.VUE_APP_BASE_URL);

Vue.prototype.$axios = axios;

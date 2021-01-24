import store from "@/store/index";
import ApiService from "@/services/api.service";

const DataService = {
  async loadAll() {
    return new Promise(async (resolve, reject) => {
      try {
        let menuItems = await this.menuList();
        console.log({ menuItems });
        store.dispatch("userdata/setUserMenu", menuItems);
        //done
        store.dispatch("userdata/setAllLoaded", true);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  menuList() {
    return new Promise((resolve, reject) => {
      ApiService.get("int/menus/user")
        .then(
          res => {
            resolve(res.data);
          },
          err => {
            reject(err);
          }
        )
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }
};

export default DataService;

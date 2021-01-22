import { decode } from "jsonwebtoken";
import StorageService from "@/services/storage.service";

function isTokenExpired() {
  return new Promise(async (res, rej) => {
    try {
      if (await StorageService.isCookieExist(process.env.TOKEN_KEY)) {
        let decodedToken = decode(
          await StorageService.getCookieByKey(process.env.TOKEN_KEY)
        );
        if (decodedToken) {
          if (Math.floor(Date.now() / 1000) > decodedToken.life_time) {
            res(true);
          } else {
            res(false);
          }
        }
      } else {
        res(true);
      }
    } catch (error) {
      rej(error);
    }
  });
}

export { isTokenExpired };

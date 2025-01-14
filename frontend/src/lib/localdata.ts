import { user } from "./interfaces";

const localStorageKeyUser = "user";
const localdata = {
  getUser: (): user => {
    return JSON.parse(localStorage.getItem(localStorageKeyUser) || "");
  },
  setUser: (user: user) => {
    localStorage.setItem(localStorageKeyUser, JSON.stringify(user));
  },
};

export default localdata;

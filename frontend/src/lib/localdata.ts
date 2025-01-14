import { user } from "./interfaces";

const localStorageKeyUser = "user";
const localStorageKeyTheme = "theme";
const localdata = {
  getUser: (): user => {
    return JSON.parse(localStorage.getItem(localStorageKeyUser) || "");
  },
  setUser: (user: user) => {
    localStorage.setItem(localStorageKeyUser, JSON.stringify(user));
  },
  getTheme: () => {
    return localStorage.getItem(localStorageKeyTheme);
  },
  setTheme: (theme: string) => {
    return localStorage.setItem(localStorageKeyTheme, theme);
  },
};

export default localdata;

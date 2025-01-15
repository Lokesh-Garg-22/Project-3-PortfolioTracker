import { User } from "./interfaces";

const localStorageKeyUser = "user";
const localStorageKeyTheme = "theme";
const localdata = {
  getUser: (): User | null => {
    if (localStorage.getItem(localStorageKeyUser))
      return JSON.parse(localStorage.getItem(localStorageKeyUser) || "");
    return null;
  },
  setUser: (user: User) => {
    localStorage.setItem(localStorageKeyUser, JSON.stringify(user));
  },
  removeUser: () => {
    localStorage.removeItem(localStorageKeyUser);
  },
  getTheme: () => {
    return localStorage.getItem(localStorageKeyTheme);
  },
  setTheme: (theme: string) => {
    return localStorage.setItem(localStorageKeyTheme, theme);
  },
};

export default localdata;

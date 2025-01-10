const localStorageKeyUser = "user";
const localdata = {
  getUser: () => {
    return JSON.parse(localStorage.getItem(localStorageKeyUser) || "");
  },
  setUser: (user: object) => {
    localStorage.setItem(localStorageKeyUser, JSON.stringify(user));
  },
};

export default localdata;

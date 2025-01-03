const localStorageKeyUser = "user";
const localdata = {
  getUser: () => {
    return localStorage.getItem(localStorageKeyUser);
  },
  setUser: (user: string) => {
    localStorage.setItem(localStorageKeyUser, user);
  },
};

export default localdata;

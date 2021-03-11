import Cookies from "js-cookie";

const sizeKey = "size";
export const getSize = () => Cookies.get(sizeKey);
export const setSize = (size: string) => Cookies.set(sizeKey, size);

// User
const tokenKey = "access_token";
const userKey = "user_name";
export const getToken = () => Cookies.get(tokenKey);
export const setToken = (token: string) => Cookies.set(tokenKey, token);
export const removeToken = () => Cookies.remove(tokenKey);

export const getUserName = () => Cookies.get(userKey);
export const setUserName = (userName: string) => {Cookies.set(userKey, userName)};

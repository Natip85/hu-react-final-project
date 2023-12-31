import { User } from "../interfaces/IUserType";

export const thepamsecretyek = "AIzaSyDeRdfT5_5oVCkUqJL_lpV7-_sRbs0WmCA"
const tokenKey = "token";
const userKey = "userData";

export function setUser(user: User | null) {
  if (user) {
    const jsonUser = JSON.stringify(user);

    localStorage.setItem(userKey, jsonUser);
  }
}

export function getUser() {
  const jsonUser = localStorage.getItem(userKey);
  if (jsonUser) {
    const parsedUser = JSON.parse(jsonUser);
    return parsedUser;
  }
}

export function removeUser() {
  localStorage.removeItem("userData");
  localStorage.removeItem(tokenKey);
  window.location.reload()
}

export function setToken(tokenValue?: string) {
  if (!tokenValue) return;
  localStorage.setItem(tokenKey, tokenValue);
}

export function getToken(): string {
  return localStorage.getItem(tokenKey) || "";
}

export function removeToken() {
  localStorage.removeItem(tokenKey);
  window.location.reload();
}

export function verifyToken(): boolean {
  return getToken().length > 0;
}

export function getAdmin(): string {
  return localStorage.getItem("admin") || "";
}

export function verifyAdmin(): boolean {
  return getAdmin().length === 4;
}

import { User } from "../interfaces/IUserType";

const tokenKey = "token";
// const adminKey = "admin";

export function setUser(user: User | null) {
  if (user) {
    const jsonUser = JSON.stringify(user);

    localStorage.setItem("userData", jsonUser);
  }
}

export function getUser() {
  const jsonUser = localStorage.getItem("userData");
  if (jsonUser) {
    const parsedUser = JSON.parse(jsonUser);
    return parsedUser;
  }
}

export function removeUser() {
  localStorage.removeItem("userData");
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

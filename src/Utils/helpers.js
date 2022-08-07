export function isAuthUser() {
  return localStorage.getItem("user");
}

export function authToken() {
  return localStorage.getItem("token");
}

export function authUserData() {
  return JSON.parse(localStorage.getItem("user"));
}

export function isAdmin() {
  if (isAuthUser()) {
    return JSON.parse(localStorage.getItem("user")).roles[0].name == "admin";
  }
  return false;
}

export function isReader() {
  if (isAuthUser) {
    return JSON.parse(localStorage.getItem("user")).roles[0].name == "reader";
  }
  return false;
}

export const API_BASE = "/var/www/qwykit.com/wordalbums-server/public";
// export const API_BASE = "";

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("roles");
  localStorage.removeItem("platform");
}

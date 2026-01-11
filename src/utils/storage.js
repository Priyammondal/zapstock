const USERS_KEY = "users";
const TOKEN_KEY = "token";
const CURRENT_USER_KEY = "currentUser";

/* USERS */
export const getUsers = () =>
  JSON.parse(localStorage.getItem(USERS_KEY)) || [];

export const saveUsers = (users) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

/* AUTH */
export const setToken = (email) => {
  localStorage.setItem(TOKEN_KEY, "mock-token");
  localStorage.setItem(CURRENT_USER_KEY, email);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const isAuthenticated = () => !!localStorage.getItem(TOKEN_KEY);

/* CURRENT USER */
export const getCurrentUser = () => {
  const email = localStorage.getItem(CURRENT_USER_KEY);
  if (!email) return null;

  return getUsers().find((u) => u.email === email);
};

export const updateCurrentUser = (updatedUser) => {
  const users = getUsers().map((u) =>
    u.email === updatedUser.email ? updatedUser : u
  );

  saveUsers(users);
};

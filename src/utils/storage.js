export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

export const saveUsers = (users) =>
  localStorage.setItem("users", JSON.stringify(users));

export const setToken = () => localStorage.setItem("token", "mock-token");

export const removeToken = () => localStorage.removeItem("token");

export const isAuthenticated = () => !!localStorage.getItem("token");

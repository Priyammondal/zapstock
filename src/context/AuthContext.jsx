import { createContext, useContext, useState } from "react";
import {
  getUsers,
  saveUsers,
  setToken,
  removeToken,
  isAuthenticated,
} from "../utils/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    isAuthenticated() ? { loggedIn: true } : null
  );

  const signup = ({ name, email, password }) => {
    console.log("hellow")
    const users = getUsers();

    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists");
    }

    users.push({ name, email, password });
    saveUsers(users);
  };

  const login = ({ email, password }) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      throw new Error("Invalid credentials");
    }

    setToken(email);
    setUser(found);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

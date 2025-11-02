import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("rc_user")) || null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("rc_user", JSON.stringify(user));
    else localStorage.removeItem("rc_user");
  }, [user]);

  const login = async ({ email, password }) => {
    // Mock login: accept any credentials for demo purposes
    const demoUser = { id: 1, name: "Demo User", email, token: "demo-token" };
    setUser(demoUser);
    return demoUser;
  };

  const register = async ({ name, email, password }) => {
    // Mock register -> behave like login
    const newUser = { id: Date.now(), name: name || "New User", email, token: "demo-token" };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

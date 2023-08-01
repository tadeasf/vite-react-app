/** @format */

import React, { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.init();

    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
    });
  }, []);

  const login = () => {
    netlifyIdentity.open("login");
  };

  const signup = () => {
    netlifyIdentity.open("signup");
  };

  const logout = () => netlifyIdentity.logout();

  const contextValue = {
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

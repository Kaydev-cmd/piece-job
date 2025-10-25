import React, { useState, createContext, useContext, useEffect } from "react";
import { LoggedInUser } from "@/interfaces";

export interface AuthContextType {
  loggedInToken: string | null;
  loggedUser: LoggedInUser | null;
  setLoggedInUser: (user: LoggedInUser | null) => void;
  baseUrl: string;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedInToken, setLoggedInToken] = useState<string>("");
  const [loggedUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

  const login = (newToken: string) => {
    console.log("new token: ", newToken, "old token:", loggedInToken);
    setLoggedInToken(newToken);
    // TODO: set logged in user here after fetching user info or accept a user parameter
  };

  const logout = () => setLoggedInToken("");

  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    console.log("AuthContext mount");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedInToken,
        login,
        logout,
        baseUrl,
        loggedUser,
        setLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import { LoggedInUser } from "@/interfaces";
import React, { useState, createContext, useContext } from "react";
import { useRouter } from "next/router";

interface AuthContextType {
  loggedInToken: string | null;
  loggedUser: LoggedInUser;
  setLoggedInUser: (user: LoggedInUser) => void;
  baseUrl: string;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedInToken, setLoggedInToken] = useState<string>("");
  const [loggedUser, setLoggedInUser] = useState<LoggedInUser>(
    {} as LoggedInUser
  );

  const router = useRouter();

  const login = (newToken: string) => {
    console.log("new token: ", newToken, "old token:", loggedInToken);
    setLoggedInToken(newToken);
  };

  const logout = () => {
    console.log("userName: ", loggedUser.username);
    setLoggedInToken("");

    setLoggedInUser({
      username: "",
      userImage: "",
      role: null,
      employerType: undefined,
    });

    console.log("user: ", loggedUser);

    router.push("/");
  };

  // const baseUrl = "http://localhost:8080";
  const baseUrl = "https://piece-job-back-end.onrender.com";

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

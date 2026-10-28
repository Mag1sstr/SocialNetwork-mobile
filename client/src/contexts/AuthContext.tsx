import { createContext, useState } from "react";

export const AuthContext = createContext({});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

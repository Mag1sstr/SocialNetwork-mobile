import { createContext, useContext, useState } from "react";
import type { IUser } from "../api/apiTypes";

interface IAuthContext {
  user: IUser | null;
  setUser: (u: IUser | null) => void;
}

export const AuthContext = createContext({} as IAuthContext);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);

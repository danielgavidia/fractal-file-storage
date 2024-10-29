import { ReactNode } from "react";
import { User } from "../types/types";
import { createContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  userInfo: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const userInfo: User = {
    id: "37a4f433-af84-433d-a2c3-4cd054329922",
    createdAt: new Date("2024-10-29T18:35:02.131Z"),
    updatedAt: new Date("2024-10-29T18:35:02.131Z"),
    firebaseId: "test1000",
    email: "test1000@gmail.com",
  };

  console.log(userInfo);

  return <AuthContext.Provider value={{ userInfo }}>{children}</AuthContext.Provider>;
};

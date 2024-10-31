import { ReactNode, useState, useEffect } from "react";
import { User } from "../types/types";
import { createContext } from "react";
import { auth } from "../auth/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "@/utils/getUser";

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  userInfo: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Here you would typically fetch your user data from your backend
        console.log("Starting Auth Provider");
        const idToken = await firebaseUser.getIdToken();
        const userData = await getUser(idToken);

        console.log(userData);
        setUserInfo(userData);
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return <AuthContext.Provider value={{ userInfo, loading }}>{children}</AuthContext.Provider>;
};

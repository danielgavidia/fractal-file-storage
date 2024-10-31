import { ReactNode, useState, useEffect } from "react";
import { createContext } from "react";
import { auth } from "../auth/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import type { User } from "@/types/types";

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
      try {
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken();
          const response = await axios.post(`http://localhost:3000/auth/login`, null, {
            headers: { Authorization: `Bearer ${idToken}` },
          });
          const user: User = response.data.user;
          setUserInfo(user);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={{ userInfo, loading }}>{children}</AuthContext.Provider>;
};

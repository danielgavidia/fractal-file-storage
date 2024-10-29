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
  userInfoFirebase: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [userInfoFirebase, setUserInfoFirebase] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Here you would typically fetch your user data from your backend
        console.log("Starting Auth Provider");
        const idToken = await firebaseUser.getIdToken();
        const userDataFirebase = await getUser(idToken);
        setUserInfoFirebase(userDataFirebase);

        console.log(userDataFirebase);

        // This is just an example - replace with your actual user data fetching logic
        const userData: User = {
          id: "37a4f433-af84-433d-a2c3-4cd054329922", // This should come from your backend
          createdAt: new Date(),
          updatedAt: new Date(),
          firebaseId: firebaseUser.uid,
          email: firebaseUser.email || "",
        };
        setUserInfo(userData);
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ userInfo, userInfoFirebase, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { idToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !idToken) {
      router.replace("/auth").catch(console.error);
    }
  }, [idToken, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!idToken) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;

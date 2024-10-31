import Link from "next/link";
import { auth } from "../auth/firebaseConfig";
import { signOut } from "firebase/auth";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

const Navbar = () => {
  const { userInfo } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("idToken");
      router.replace("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex items-center px-8 py-2 bg-white shadow-sm">
      <Link href="/files" className="text-md flex-1 font-bold text-gray-800">
        Danielbox
      </Link>

      <Link
        href="/files"
        className="px-4 py-2 text-gray-800 text-sm font-light hover:bg-gray-100 hover:text-gray-600 rounded-md transition-colors"
      >
        Files
      </Link>
      <Link
        href="/upload"
        className="px-4 py-2 text-gray-800 text-sm font-light hover:bg-gray-100 hover:text-gray-600 rounded-md transition-colors"
      >
        Upload
      </Link>
      {userInfo ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-gray-800 text-sm font-light hover:bg-gray-100 hover:text-gray-600 rounded-md transition-colors"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/auth"
          className="px-4 py-2 text-gray-800 text-sm font-light hover:bg-gray-100 hover:text-gray-600 rounded-md transition-colors"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;

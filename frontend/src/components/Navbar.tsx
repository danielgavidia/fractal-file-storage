import Link from "next/link";
import { auth } from "../auth/firebaseConfig";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";

const Navbar = () => {
  const { userInfo } = useContext(AuthContext) ?? {};

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <Link href="/files" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
        Danielbox
      </Link>

      <div className="flex gap-4">
        <Link
          href="/files"
          className="px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-600 rounded-md transition-colors"
        >
          Files
        </Link>
        <Link
          href="/upload"
          className="px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-600 rounded-md transition-colors"
        >
          Upload New
        </Link>
        {userInfo ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-600 rounded-md transition-colors"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/auth"
            className="px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-600 rounded-md transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

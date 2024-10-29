"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/utils/firebaseAuth";

const AuthForm = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError("");
      await firebaseAuth();
      router.push("/files");
    } catch (err) {
      setError("Authentication failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome to App</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in with Google to continue</p>
        </div>

        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? "Please wait..." : "Continue with Google"}
        </button>

        {error && <p className="text-center text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AuthForm;

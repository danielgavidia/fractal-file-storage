import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";

export async function firebaseAuth(): Promise<void> {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, provider);
    console.log(result);
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    throw error;
  }
}

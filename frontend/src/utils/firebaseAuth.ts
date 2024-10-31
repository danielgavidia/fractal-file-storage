import { signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";
import { withLogging } from "./withLogging";

export const firebaseAuth = withLogging(
  "firebaseAuth",
  false,
  async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    const result: UserCredential = await signInWithPopup(auth, provider);
    return result;
  }
);

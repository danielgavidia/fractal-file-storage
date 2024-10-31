import { signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";

export async function firebaseAuth(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  const result: UserCredential = await signInWithPopup(auth, provider);
  return result;
}
